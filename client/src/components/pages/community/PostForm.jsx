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
import { Send } from "lucide-react";

export default function PostForm({ onSubmit }) {
  const [postData, setPostData] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(postData);
    setPostData({ title: "", content: "" });
  };

  return (
    <Card className="bg-secondary border-none shadow-lg mb-8">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <h2 className="text-2xl md:text-4xl font-semibold titlefont text-primary">
            Create New Post
          </h2>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Post Title"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              className="border-primary bg-white/90 focus:border-[#9e5c1f] focus:ring-[#9e5c1f]"
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="What's on your mind?"
              value={postData.content}
              onChange={(e) =>
                setPostData({ ...postData, content: e.target.value })
              }
              className="min-h-[150px] border-yellow-800 bg-white/90 focus:border-[#9e5c1f] focus:ring-[#9e5c1f]"
              required
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-[#9e5c1f] text-white hover:bg-[#9e5c1f]/90">
            <Send className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
