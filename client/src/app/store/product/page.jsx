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
    <div className="p-6 space-y-8 bg-secondary">
      {/* Horizontal Product Card */}
      <Card className="shadow-md border-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section - Image, Price & Buttons */}
            <div className="flex flex-col items-center justify-start w-full lg:w-1/3 space-y-4">
              <img
                src={product.images?.[0] || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <p className="text-lg text-primary font-semibold">
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
                  className="bg-primary hover:bg-primary/90 text-white w-1/2 shadow-sm"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "bg-accent text-primary hover:bg-accent/90 w-1/2 shadow-sm"
                  )}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Middle Section - Info + Description */}
            <div className="w-full lg:w-1/3 space-y-2">
              <CardTitle className="text-xl font-bold text-primary titlefont">
                {product.name}
              </CardTitle>
              <p className="text-sm text-secondary">
                Category: {product.category}
              </p>
              <div className="text-accent text-sm">⭐ {product.rating}</div>

              {/* Description */}
              <h4 className="mt-4 font-semibold text-primary">Description</h4>
              <p className="text-sm text-secondary">{product.description}</p>
            </div>

            {/* Right Section - Reviews + Write Review */}
            <div className="w-full lg:w-1/3 space-y-4">
              <h4 className="font-semibold text-primary">Reviews</h4>

              {/* Existing Reviews */}
              <div className="text-sm text-secondary max-h-60 overflow-auto pr-2">
                {product.reviews?.length > 0 ? (
                  product.reviews.map((review, i) => (
                    <div key={i} className="border-t border-accent/30 pt-2 mt-2">
                      <div className="text-accent">⭐ {review.rating}</div>
                      <p>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>

              {/* Write Review Box */}
              <div className="pt-4 border-t border-accent/30 mt-4 space-y-2">
                <h5 className="font-semibold text-primary">Write a Review</h5>

                {/* Media Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-secondary">
                    Add Media (images/videos):
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleMediaChange}
                    className="text-sm text-secondary file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary/90"
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
                            className="w-20 h-20 object-cover rounded-md border border-accent/30"
                          />
                        );
                      } else if (file.type.startsWith("video/")) {
                        return (
                          <video
                            key={idx}
                            src={url}
                            controls
                            className="w-20 h-20 object-cover rounded-md border border-accent/30"
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
                  className="w-full h-24 p-2 border border-accent/30 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                ></textarea>

                {/* Star Input */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-secondary">Rating:</label>
                  <select className="border border-accent/30 rounded p-1 text-sm bg-white text-primary">
                    <option value="5">5 ⭐</option>
                    <option value="4">4 ⭐</option>
                    <option value="3">3 ⭐</option>
                    <option value="2">2 ⭐</option>
                    <option value="1">1 ⭐</option>
                  </select>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm">
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Products Placeholder */}
      <Card className="shadow-md border-0">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2 text-primary titlefont">Recommended Products</h3>
          <p className="text-secondary">Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
