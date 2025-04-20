"use client";

import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fetchProduct = () => {
  if (typeof window !== "undefined") {
    const product = JSON.parse(localStorage.getItem("product"));
    return product;
  }
  return null;
};

export default function ProductPage() {
  const product = fetchProduct();
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);
  };

  if (!product) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Horizontal Product Card */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section - Image, Price & Buttons */}
            <div className="flex flex-col items-center justify-start w-full lg:w-1/3 space-y-4">
              <img
                src={product.images?.[0] || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-lg text-gray-800 font-semibold">
                ₹{product.price}
                {product.discount > 0 && (
                  <span className="text-sm text-red-500 ml-2">
                    ({product.discount}% off)
                  </span>
                )}
              </p>
              <div className="flex gap-4 w-full justify-center">
                <Button
                  variant="outline"
                  className="bg-green-700 hover:bg-green-800 text-white w-1/2"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "bg-blue-500 text-white hover:bg-blue-600 w-1/2"
                  )}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Middle Section - Info + Description */}
            <div className="w-full lg:w-1/3 space-y-2">
              <CardTitle className="text-xl font-bold text-green-800">
                {product.name}
              </CardTitle>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
              <div className="text-yellow-500 text-sm">⭐ {product.rating}</div>

              {/* Description */}
              <h4 className="mt-4 font-semibold text-gray-800">Description</h4>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>

            {/* Right Section - Reviews + Write Review */}
            <div className="w-full lg:w-1/3 space-y-4">
              <h4 className="font-semibold text-gray-800">Reviews</h4>

              {/* Existing Reviews */}
              <div className="text-sm text-gray-600 max-h-60 overflow-auto pr-2">
                {product.reviews?.length > 0 ? (
                  product.reviews.map((review, i) => (
                    <div key={i} className="border-t pt-2 mt-2">
                      <div>⭐ {review.rating}</div>
                      <p>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>

              {/* Write Review Box */}
              <div className="pt-4 border-t mt-4 space-y-2">
                <h5 className="font-semibold text-gray-800">Write a Review</h5>

                {/* Media Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600">
                    Add Media (images/videos):
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleMediaChange}
                    className="text-sm text-gray-600 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:bg-green-700 file:text-white hover:file:bg-green-800"
                  />

                  {/* Preview */}
                  <div className="flex flex-wrap gap-3 mt-2">
                    {mediaFiles.map((file, idx) => {
                      const url = URL.createObjectURL(file);
                      if (file.type.startsWith("image/")) {
                        return (
                          <img
                            key={idx}
                            src={url}
                            alt={`preview-${idx}`}
                            className="w-20 h-20 object-cover rounded-md border"
                          />
                        );
                      } else if (file.type.startsWith("video/")) {
                        return (
                          <video
                            key={idx}
                            src={url}
                            controls
                            className="w-20 h-20 object-cover rounded-md border"
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>

                {/* Review Input */}
                <textarea
                  placeholder="Write your review here..."
                  className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>

                {/* Star Input */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Rating:</label>
                  <select className="border border-gray-300 rounded p-1 text-sm">
                    <option value="5">5 ⭐</option>
                    <option value="4">4 ⭐</option>
                    <option value="3">3 ⭐</option>
                    <option value="2">2 ⭐</option>
                    <option value="1">1 ⭐</option>
                  </select>
                </div>

                <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Products Placeholder */}
      <Card className="shadow-md">
        <CardContent className="p-6 text-center text-gray-500">
          <h3 className="text-lg font-semibold mb-2">Recommended Products</h3>
          <p>Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
