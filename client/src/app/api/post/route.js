import User from "@/../db/schema/user.schema";
import Community from "@/../db/schema/community.schema";
import CommunityPost from "@/../db/schema/communitypost.schema";
import { connectToDatabase } from "@/../db/dbConfig";
import { NextResponse } from "next/server";
import { getUserByToken } from "@/../actions/userActions";

connectToDatabase();

// Create a new post
export async function POST(request) {
  try {
    const { communityId, postData, token } = await request.json();
    if (!token || !postData || !communityId) {
      return NextResponse.json(
        {
          success: false,
          error: "Token or post data or community id is missing",
        },
        { status: 401 }
      );
    }
    const response = await getUserByToken(token, "user");
    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.message },
        { status: 401 }
      );
    }
    const user = response.user;

    const community = await Community.findById(communityId).lean();
    if (!community) {
      return NextResponse.json(
        { success: false, error: "Community not found" },
        { status: 404 }
      );
    }
    const date = new Date();

    const post = new CommunityPost({
      title: postData.title,
      content: postData.content,
      author: user._id.toString(),
      community: communityId.toString(),
      commentCount: 0,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    });

    await post.save();

    return NextResponse.json({
      success: true,
      message: "Post created successfully!",
      post: {
        _id: post._id.toString(),
        title: post.title,
        content: post.content,
        author: {
          _id: user._id.toString(),
          name: user.name,
        },
        commentCount: 0,
        createdAt: post.createdAt.toISOString(),
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
