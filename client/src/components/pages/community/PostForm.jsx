import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, X, Image as ImageIcon } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

export default function PostForm({ onSubmit }) {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(postData);
    setPostData({ title: "", content: "", image: "" });
    setMessage("");
  };

  const handleOnUpload = (result) => {
    console.log("Upload successful:", result);
    const imageUrl = result.info.secure_url;
    setPostData((prev) => ({
      ...prev,
      image: imageUrl,
    }));
    setMessage("Image uploaded successfully!");
  };

  const handleUploadError = (error) => {
    console.error("Upload error:", error);
    setMessage(`Upload error: ${error.message || "Unknown error"}`);
  };

  const handleRemoveImage = () => {
    setPostData((prev) => ({
      ...prev,
      image: "",
    }));
    setMessage("Image removed successfully!");
  };

  return (
    <Card className="bg-secondary border-none shadow-lg mb-8 overflow-hidden">
      <form onSubmit={handleSubmit}>
        <CardHeader className="  ">
          <h2 className="text-2xl md:text-3xl font-semibold titlefont text-primary">
            Create New Post
          </h2>
        </CardHeader>

        {message && (
          <div
            className={`mx-6 p-2 mt-4 ${
              message.includes("Error") || message.includes("error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            } rounded-md flex items-center justify-between`}>
            <span>{message}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setMessage("")}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <CardContent className="space-y-4 pt-6">
          <div>
            <label
              htmlFor="post-title"
              className="text-sm font-medium text-gray-700 mb-1 block">
              Title
            </label>
            <Input
              id="post-title"
              type="text"
              placeholder="Write an engaging title..."
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              className="border-primary/30 bg-white/90 focus:border-primary focus:ring-primary/20"
              required
            />
          </div>
          <div>
            <label
              htmlFor="post-content"
              className="text-sm font-medium text-gray-700 mb-1 block">
              Content
            </label>
            <Textarea
              id="post-content"
              placeholder="What's on your mind?"
              value={postData.content}
              onChange={(e) =>
                setPostData({ ...postData, content: e.target.value })
              }
              className="min-h-[150px] bg-white/90 focus:border-primary focus:ring-primary/20"
              required
            />
          </div>

          {/* Image Preview */}
          {postData.image && (
            <div className="relative group">
              <div className="rounded-md overflow-hidden">
                <img
                  src={postData.image}
                  alt="Preview"
                  className="object-cover w-full h-auto"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemoveImage}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-0 border-t  ">
          <div className="py-2">
            <ImageUploader
              image={postData.image}
              onUploadSuccess={handleOnUpload}
              onUploadError={handleUploadError}
              onRemoveImage={handleRemoveImage}
            />
          </div>
          <Button
            type="submit"
            className="bg-primary text-white hover:bg-primary/90 transition-colors">
            <Send className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
