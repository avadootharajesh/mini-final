import React, { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, User } from "lucide-react";
import Image from "next/image";

function PostCard({
  post,
  comments = [],
  onComment,
  isCommenting,
  onCancelComment,
  onSubmitComment,
}) {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onSubmitComment(commentText);
      setCommentText("");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy • h:mm a");
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage
              src={post.author?.profilePicture}
              alt={post.author?.name || "User"}
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(post.author?.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-primary">
              {post.author?.name || "Unknown user"}
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          {post.title}
        </h3>
        <p className="text-gray-700 whitespace-pre-wrap ">{post.content}</p>

        {/* Image Gallery - Display post images */}
        {post.image && post.image !== "" && (
          <div className="relative w-full h-64 rounded-md overflow-hidden mb-2">
            <Image
              src={post.image}
              alt="Post attachment"
              fill
              className="object-cover"
              unoptimized={post.image.includes("http")}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="flex items-center justify-between w-full mb-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-primary flex items-center"
            onClick={toggleComments}>
            <MessageSquare className="h-4 w-4 mr-1" />
            {post.commentCount || comments.length} Comments
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-primary/10 hover:text-primary hover:border-primary/30"
            onClick={() => onComment(post._id)}>
            Reply
          </Button>
        </div>

        {/* Comment form */}
        {isCommenting && (
          <form onSubmit={handleCommentSubmit} className="w-full mt-2">
            <Textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full min-h-[80px] mb-2 focus:border-primary focus:ring-primary/20"
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancelComment}
                size="sm">
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white">
                Send
              </Button>
            </div>
          </form>
        )}

        {/* Comments section */}
        {showComments && comments.length > 0 && (
          <div className="w-full mt-4 space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Comments</h4>
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={comment.user?.profilePicture}
                      alt={comment.user?.name || "User"}
                    />
                    <AvatarFallback className="bg-primary/10">
                      <User className="h-3 w-3 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xs font-medium text-gray-800">
                    {comment.user?.name || "Unknown user"}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{comment.comment}</p>
              </div>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default PostCard;
