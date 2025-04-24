"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import PostCard from "@/components/pages/community/PostCard";
import PostForm from "@/components/pages/community/PostForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { getUserByToken, getToken } from "@/../actions/userActions";
import { Loader2 } from "lucide-react";

function CommunityInteriorPage() {
  const params = useParams();
  const communityId = params.id;

  const [communityName, setCommunityName] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [activePostId, setActivePostId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setAuthStatus();
    fetchPosts();
  }, [communityId]);

  const setAuthStatus = async () => {
    if (typeof window !== "undefined") {
      try {
        const userToken = await getToken("userToken");
        if (userToken) {
          const res = await getUserByToken(userToken, "user");
          if (res.success) {
            setIsLoggedIn(true);
            setUser(res.user);
            setToken(userToken);
          } else {
            console.error(res.message);
            throw new Error(res.message);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Auth verification error:", error);
        setIsLoggedIn(false);
      }
    }
  };

  const fetchPosts = async () => {
    if (!communityId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/post?communityId=${communityId}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.posts || []);
        if (data.communityName) {
          setCommunityName(data.communityName);
        }

        if (data.posts && data.posts.length > 0) {
          for (const post of data.posts) {
            fetchCommentsForPost(post._id);
          }
        }
      } else {
        console.warn("No posts found:", data.message || data.error);
        if (data.error && data.error !== "No posts found for this community") {
          toast.error(data.error);
        }
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommentsForPost = async (postId) => {
    try {
      const response = await fetch(`/api/comment?postId=${postId}`);
      const data = await response.json();

      if (data.success) {
        setCommentsMap((prevMap) => ({
          ...prevMap,
          [postId]: data.comments || [],
        }));
      } else {
        console.warn(
          `No comments found for post ${postId}:`,
          data.message || data.error
        );
      }
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
    }
  };

  const handleCreatePost = async (postData) => {
    if (!isLoggedIn) {
      toast.error("Please login to create a post");
      return;
    }

    try {
      // Make sure to include the image in the postData
      const response = await axios.post("/api/post", {
        communityId,
        postData: {
          title: postData.title,
          content: postData.content,
          image: postData.image || "", // Ensure image URL is included
        },
        token,
      });
      const data = response.data;

      if (data.success) {
        toast.success("Post created successfully!");
        fetchPosts();
      } else {
        toast.error(data.error || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    }
  };

  const handleComment = (postId) => {
    if (!isLoggedIn) {
      toast.error("Please login to comment");
      return;
    }
    setActivePostId(postId);
  };

  const handleCancelComment = () => {
    setActivePostId(null);
  };

  const handleSubmitComment = async (postId, commentText) => {
    if (!isLoggedIn) {
      toast.error("Please login to comment");
      return;
    }

    if (!commentText || commentText.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const response = await axios.post("/api/comment", {
        postId,
        commentText: commentText.trim(),
        token,
      });
      const data = response.data;

      if (data.success) {
        toast.success("Comment posted successfully!");
        fetchCommentsForPost(postId);
        setActivePostId(null);
      } else {
        toast.error(data.error || "Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-gray-600 font-medium">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {communityName && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary titlefont">
            {communityName}
          </h1>
          <p className="text-gray-600 mt-1">
            Join the discussion and share your thoughts!
          </p>
        </div>
      )}

      {isLoggedIn ? (
        <PostForm onSubmit={handleCreatePost} />
      ) : (
        <Alert className="mb-8 border-[#dc2446] border-2 bg-white/90 shadow-sm">
          <AlertDescription className="text-black flex items-center justify-between py-2">
            <span className="font-medium">
              Login to create posts and participate in discussions!
            </span>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              comments={commentsMap[post._id] || []}
              commentCount={post.commentCount}
              onComment={handleComment}
              isCommenting={activePostId === post._id}
              onCancelComment={handleCancelComment}
              onSubmitComment={(commentText) =>
                handleSubmitComment(post._id, commentText)
              }
              currentUser={user}
            />
          ))
        ) : (
          <Card className="bg-white shadow-md overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center p-12">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <MessageSquare className="h-12 w-12 text-primary" />
              </div>
              <p className="text-xl font-medium text-gray-700 mb-2">
                No posts in this community yet
              </p>
              <p className="text-gray-500 text-center">
                Be the first to create a post and start the conversation!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default CommunityInteriorPage;
