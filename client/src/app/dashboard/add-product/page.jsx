"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";
import { logout } from "@/lib/userutils";
import Link from "next/link";
import { getAuthenticatedUser } from "../../../../actions/loginActions";
import axios from "axios";
import ImageUploader from "@/components/ImageUploader"; // Assuming this is the correct path

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    tags: "",
    images: [],
  });

  const [images, setImages] = useState([]); // stores uploaded images as URLs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // This function handles the successful upload of images from ImageUploader
  const handleImageUploadSuccess = (result) => {
    const uploadedImageUrl = result.info.secure_url;
    setImages((prev) => [...prev, uploadedImageUrl]); // Add the uploaded image URL to the images array
  };

  const handleImageUploadError = (error) => {
    console.error("Error uploading image:", error);
    toast.error("Image upload failed.");
  };

  useEffect(() => {
    try {
      getAuthenticatedUser().then((user) => {
        setUser(user);
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data");
      router.push("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Step 2: Send form + user + image URLs
    try {
      const formPayload = {
        user,
        product: {
          ...form,
          images, // Include the uploaded images
        },
      };

      const res = await axios.post("/api/product", formPayload);
      toast.success("Product submitted successfully!");

      // Reset form and state
      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        tags: "",
      });
      setImages([]); // Clear uploaded images
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Navbar */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="text-white text-xl font-semibold animate-pulse">
            Loading... <br />
            Please wait!
          </div>
        </div>
      )}

      <nav className="flex justify-between items-center bg-primary text-white p-4 shadow-md">
        <h1 className="text-xl font-bold titlefont">Add Product</h1>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-primary/80">
              Dashboard
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="text-white hover:bg-primary/80"
            onClick={() => {
              logout();
              router.push("/login");
              toast.success("Logout successful");
            }}
          >
            Logout
          </Button>
          <Avatar>
            <AvatarImage src="/profile.jpg" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </nav>

      {/* Product Form */}
      <div className="p-6">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-primary">Add New Product</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <Input
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Textarea
                name="description"
                placeholder="Product Description"
                value={form.description}
                onChange={handleChange}
                required
              />
              <Input
                type="number"
                name="price"
                placeholder="Price (for 1 unit)"
                value={form.price}
                onChange={handleChange}
                required
              />
              <Input
                type="number"
                name="quantity"
                placeholder="Quantity (in kg)"
                value={form.quantity}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="tags"
                placeholder="Tags (comma-separated)"
                value={form.tags}
                onChange={handleChange}
              />

              {/* Image Upload with ImageUploader */}
              <div>
                <label className="block mb-1 font-medium">
                  Upload Images (max 10)
                </label>
                <ImageUploader
                  image={images[0]} // Only show the first uploaded image as preview
                  onUploadSuccess={handleImageUploadSuccess}
                  onUploadError={handleImageUploadError}
                />
              </div>

              {/* Displaying Image Previews */}
              {images.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 font-medium text-sm text-secondary">Uploaded Images</p>
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((url, index) => (
                      <div
                        key={index}
                        className="relative h-24 border rounded overflow-hidden"
                      >
                        <img
                          src={url}
                          alt={`Uploaded Image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Add Product"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
