import User from "@/../db/schema/user.schema";
import Community from "@/../db/schema/community.schema";
import CommunityPost from "@/../db/schema/communitypost.schema";
import { connectToDatabase } from "@/../db/dbConfig";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getUserByToken } from "@/../actions/userActions";

connectToDatabase();

// GET all communities
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const communityId = searchParams.get("communityId");

    if (communityId) {
      return await getPosts(communityId);
    }

    const communities = await Community.find().populate("admin", "name").lean();

    const formattedCommunities = communities.map((community) => ({
      ...community,
      _id: community._id?.toString() || "",
      admin: community.admin
        ? {
            _id: community.admin._id?.toString() || "",
            name: community.admin.name || "Unknown",
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
    const { communityData, token } = body;

    if (!communityData) {
      return NextResponse.json(
        { success: false, error: "Community data is required" },
        { status: 400 }
      );
    }

    const requiredFields = ["name", "description"];
    for (const field of requiredFields) {
      if (!communityData[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 401 }
      );
    }

    let user;
    try {
      const userResult = await getUserByToken(token, "user");
      if (!userResult || !userResult.success) {
        return NextResponse.json(
          { success: false, error: "Invalid or expired token" },
          { status: 401 }
        );
      }
      user = userResult.user;
    } catch (authError) {
      console.error("Auth error:", authError);
      return NextResponse.json(
        { success: false, error: "Authentication failed" },
        { status: 401 }
      );
    }

    if (!user || !user._id) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    let community;
    try {
      community = new Community({
        ...communityData,
        admin: user._id,
        posts: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await community.save();
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { success: false, error: "Failed to save community" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Community created successfully!",
      community: {
        ...community.toObject(),
        _id: community._id.toString(),
        admin: {
          _id: user._id.toString(),
          name: user.name,
        },
      },
    });
  } catch (err) {
    console.error("Error in POST community:", {
      error: err.message,
      stack: err.stack,
    });
    return NextResponse.json(
      { success: false, error: "Internal server error" },
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
          select: "name _id",
        },
        {
          path: "comments.user",
          select: "name _id",
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
        name: post.author?.name || "Unknown",
      },
      comments: post.comments?.map((comment) => ({
        _id: comment._id.toString(),
        comment: comment.comment,
        user: {
          _id: comment.user?._id.toString(),
          name: comment.user?.name || "Unknown",
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
