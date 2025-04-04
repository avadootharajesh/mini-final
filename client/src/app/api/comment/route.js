import User from "@/../db/schema/user.schema";
import Comment from "@/../db/schema/comment.schema";
import CommunityPost from "@/../db/schema/communitypost.schema";
import { connectToDatabase } from "@/../db/dbConfig";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

connectToDatabase();

// Create a new comment
export async function POST(request) {
  try {
    const { postId, commentText } = await request.json();
    const token = request.headers.get("authorization")?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication token is required" },
        { status: 401 }
      );
    }

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "Post ID is required" },
        { status: 400 }
      );
    }

    if (
      !commentText ||
      typeof commentText !== "string" ||
      commentText.trim() === ""
    ) {
      return NextResponse.json(
        { success: false, error: "Comment text is required" },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const post = await CommunityPost.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    // Create a new comment document instead of adding to post
    const newComment = new Comment({
      comment: commentText.trim(),
      user: user._id,
      post: postId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the comment
    await newComment.save();

    // Update the comment count on the post
    post.commentCount += 1;
    await post.save();

    return NextResponse.json({
      success: true,
      message: "Comment posted successfully!",
      comment: {
        _id: newComment._id,
        comment: newComment.comment,
        user: {
          _id: user._id,
          username: user.username,
        },
        createdAt: newComment.createdAt,
      },
    });
  } catch (err) {
    console.error("Error in createComment:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// Get comments for a post
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const postId = url.searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Find all comments for this post and populate user data
    const comments = await Comment.find({ post: postId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (err) {
    console.error("Error getting comments:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
