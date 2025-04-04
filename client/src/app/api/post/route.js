import User from "@/../db/schema/user.schema";
import Community from "@/../db/schema/community.schema";
import CommunityPost from "@/../db/schema/communitypost.schema";
import { connectToDatabase } from "@/../db/dbConfig";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

connectToDatabase();

// Create a new post
export async function POST(request) {
  try {
    const { communityId, postData } = await request.json();
    const token = request.headers.get("authorization")?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication token is required" },
        { status: 401 }
      );
    }

    if (!communityId) {
      return NextResponse.json(
        { success: false, error: "Community ID is required" },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const community = await Community.findById(communityId);
    if (!community) {
      return NextResponse.json(
        { success: false, error: "Community not found" },
        { status: 404 }
      );
    }

    // Create the post according to the schema
    const post = new CommunityPost({
      title: postData.title,
      content: postData.content,
      author: user._id,
      community: communityId,
      commentCount: 0, // Initialize comment count to 0
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await post.save();

    // No need to modify the community schema as it doesn't have posts array

    return NextResponse.json({
      success: true,
      message: "Post created successfully!",
      post: {
        _id: post._id.toString(),
        title: post.title,
        content: post.content,
        author: {
          _id: user._id.toString(),
          username: user.username,
        },
        commentCount: 0,
        createdAt: post.createdAt,
      },
    });
  } catch (err) {
    console.error("Error in createPost:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// Get posts for a community
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const communityId = url.searchParams.get("communityId");

    if (!communityId) {
      return NextResponse.json(
        { success: false, error: "Community ID is required" },
        { status: 400 }
      );
    }

    // Find all posts for the community and populate author information
    const posts = await CommunityPost.find({ community: communityId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (err) {
    console.error("Error getting posts:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
