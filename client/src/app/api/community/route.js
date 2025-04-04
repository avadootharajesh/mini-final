import User from "@/../db/schema/user.schema";
import Community from "@/../db/schema/community.schema";
import CommunityPost from "@/../db/schema/communitypost.schema";
import { connectToDatabase } from "@/../db/dbConfig";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

connectToDatabase();

// GET all communities
export async function GET(request) {
  try {
    // Extract communityId from URL query params if present
    const { searchParams } = new URL(request.url);
    const communityId = searchParams.get("communityId");

    // If communityId is provided, get posts for that community
    if (communityId) {
      return await getPosts(communityId);
    }

    // Otherwise get all communities
    const communities = await Community.find()
      .populate("admin", "username")
      .lean();

    const formattedCommunities = communities.map((community) => ({
      ...community,
      _id: community._id?.toString() || "",
      admin: community.admin
        ? {
            _id: community.admin._id?.toString() || "",
            username: community.admin.username || "Unknown",
          }
        : null,

      posts: Array.isArray(community.posts)
        ? community.posts.map((post) => ({
            ...post,
            _id: post._id?.toString() || "",
          }))
        : [],
    }));

    return NextResponse.json({
      success: true,
      communities: formattedCommunities,
    });
  } catch (err) {
    console.error("Error in GET communities:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// Create a new community
export async function POST(request) {
  try {
    const body = await request.json();
    const { communityData } = body;
    const token = request.headers.get("authorization")?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication token is required" },
        { status: 401 }
      );
    }

    // If the request is to create a community post
    if (body.type === "post") {
      return await createPost(request);
    }

    // If the request is to add a comment
    if (body.type === "comment") {
      return await createComment(request);
    }

    // Continue with creating a new community
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const community = new Community({
      ...communityData,
      admin: user._id,
      posts: [], // Initialize with empty posts array
    });

    await community.save();

    return NextResponse.json({
      success: true,
      message: "Community created successfully!",
      community: {
        ...community.toObject(),
        _id: community._id.toString(),
        admin: {
          _id: user._id.toString(),
          username: user.username,
        },
      },
    });
  } catch (err) {
    console.error("Error in POST community:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// Helper function to get posts for a community
async function getPosts(communityId) {
  try {
    if (!communityId) {
      return NextResponse.json(
        { success: false, error: "Community ID is required" },
        { status: 400 }
      );
    }

    const communityPosts = await CommunityPost.find({
      community: communityId,
    })
      .populate([
        {
          path: "author",
          select: "username _id",
        },
        {
          path: "comments.user",
          select: "username _id",
        },
      ])
      .sort({ createdAt: -1 });

    if (!communityPosts || communityPosts.length === 0) {
      return NextResponse.json({
        success: true,
        posts: [],
        message: "No posts found for this community",
      });
    }

    const transformedPosts = communityPosts.map((post) => ({
      _id: post._id.toString(),
      title: post.title,
      content: post.content,
      author: {
        _id: post.author?._id.toString(),
        username: post.author?.username || "Unknown",
      },
      comments: post.comments?.map((comment) => ({
        _id: comment._id.toString(),
        comment: comment.comment,
        user: {
          _id: comment.user?._id.toString(),
          username: comment.user?.username || "Unknown",
        },
        createdAt: comment.createdAt,
      })),
      createdAt: post.createdAt,
    }));

    return NextResponse.json({ success: true, posts: transformedPosts });
  } catch (err) {
    console.error("Error in getPosts:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
