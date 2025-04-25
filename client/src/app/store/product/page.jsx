"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { getAuthenticatedUser } from "../../../../actions/loginActions";
import { addReviewToDatabase } from "../../../../actions/storeActions";
import axios from "axios";
import { addToCart } from "../functions";
import { useRouter } from "next/navigation";
import useProductStore from "@/lib/zustand";

const fetchProduct = () => {
  if (typeof window !== "undefined") {
    const product = JSON.parse(localStorage.getItem("product"));
    return product;
  }
  return null;
};

const fetchReviews = async (productId) => {
  try {
    const response = await axios.get("/api/review", { params: { productId } });
    return response.data.data;
  } catch {
    return [];
  }
};

async function uploadMediaToCloudinary(media) {
  const readFileAsBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const uploadedMediaUrls = [];
  for (const image of media) {
    const base64 = await readFileAsBase64(image);
    const res = await axios.post("/api/product/upload-image", { base64 });
    uploadedMediaUrls.push(res.data.url);
  }

  return uploadedMediaUrls;
}

async function addReview(review, setLoading, setReviews, productId) {
  if (!review.comment) {
    toast.error("Please add a comment and a rating");
    return;
  }

  setLoading(true);
  try {
    const user = await getAuthenticatedUser();
    review.user = user._id;

    const uploadedMediaUrls = await uploadMediaToCloudinary(review.media);
    review.media = uploadedMediaUrls;

    const result = await addReviewToDatabase(review);
    if (result.status === 200) {
      toast.success("Review added successfully!");
      const updatedReviews = await fetchReviews(productId);
      setReviews(updatedReviews);
    }
  } catch {
    toast.error("Error adding review! Please try again.");
  } finally {
    setLoading(false);
  }
}

export default function ProductPage() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const allprods = useProductStore((state) => state.products);
  const router = useRouter();

  const [review, setReview] = useState({
    rating: 4,
    comment: "",
    media: [],
    user: null,
  });

  useEffect(() => {
    const prod = fetchProduct();
    if (prod) {
      setProduct(prod);
      const joinedTags = prod.tags?.join(",") || "";

      axios
        .get("/api/product/recommended", {
          params: {
            productId: prod._id,
            name: prod.name,
            description: prod.description,
            category: prod.category,
            tags: joinedTags,
          },
        })
        .then((res) => setRecommendedProducts(res.data.recommended || []))
        .catch((err) =>
          console.error("Error fetching recommended products", err)
        );
    }
  }, []);

  useEffect(() => {
    if (product) {
      fetchReviews(product._id).then(setReviews);
    }
  }, [product]);

  if (!product) return <p className="p-6 text-center">Loading...</p>;

  const addToCartAction = (productId) => {
    getAuthenticatedUser().then((user) => {
      addToCart(user._id, productId);
    });
    toast.success("Product added to cart!");
  };

  const handleBuyNow = (product) => {
    localStorage.setItem(
      "checkoutItem",
      JSON.stringify({ ...product, quantity: 1 })
    );
    router.push("/store/checkout");
  };

  return (
    <div className="p-6 space-y-8 bg-secondary">
      <Card className="shadow-md border-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Product Image and Actions */}
            <div className="flex flex-col items-center w-full lg:w-1/3 space-y-4">
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
                  className="bg-primary hover:bg-primary/90 text-white w-1/2 shadow-sm"
                  onClick={() => addToCartAction(product._id)}
                >
                  Add to Cart
                </Button>
                <Button
                  className="bg-accent text-primary hover:bg-accent/90 w-1/2 shadow-sm"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/3 space-y-2">
              <CardTitle className="text-xl font-bold text-primary titlefont">
                {product.name}
              </CardTitle>
              <p className="text-sm text-secondary">
                Category: {product.category}
              </p>
              <div className="text-accent text-sm">⭐ {product.rating}</div>
              <h4 className="mt-4 font-semibold text-primary">Description</h4>
              <p className="text-sm text-secondary">{product.description}</p>
            </div>

            {/* Reviews Section */}
            <div className="w-full lg:w-1/3 space-y-4">
              <h4 className="font-semibold text-primary">Reviews</h4>
              <div className="text-sm text-secondary max-h-64 overflow-auto pr-2 space-y-4 border border-gray-200 rounded-md p-3 shadow-inner bg-gray-50">
                {reviews.length > 0 ? (
                  reviews.map((review, i) => (
                    <div key={i} className="border-b pb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-yellow-500">⭐ {review.rating}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p>{review.comment}</p>
                      {review.media?.length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {review.media.map((url, idx) =>
                            url.includes("image") ? (
                              <img
                                key={idx}
                                src={url}
                                className="w-16 h-16 object-cover rounded-md border"
                                alt={`media-${idx}`}
                              />
                            ) : (
                              <video
                                key={idx}
                                src={url}
                                controls
                                className="w-24 h-16 rounded-md border"
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No reviews yet.</p>
                )}
              </div>

              {/* Review Form */}
              <div className="pt-4 border-t border-accent/30 mt-4 space-y-2">
                <h5 className="font-semibold text-primary">Write a Review</h5>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    if (files.length + review.media.length > 10) {
                      toast.error("You can upload up to 10 files only");
                      return;
                    }
                    setReview({
                      ...review,
                      media: [...review.media, ...files],
                    });
                  }}
                  className="text-sm file:bg-primary file:text-white file:px-2 file:rounded-md file:py-1 file:border-0 hover:file:bg-primary/90"
                />
                <div className="flex flex-wrap gap-3 mt-2">
                  {review.media.map((file, idx) => {
                    const url = URL.createObjectURL(file);
                    if (file.type.startsWith("image/")) {
                      return (
                        <img
                          key={idx}
                          src={url}
                          className="w-20 h-20 object-cover rounded-md border"
                          alt={`preview-${idx}`}
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
                <textarea
                  placeholder="Write your review here..."
                  className="w-full h-24 p-2 border border-accent/30 rounded-md resize-none"
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                  value={review.comment}
                />
                <div className="flex items-center gap-2">
                  <label className="text-sm text-secondary">Rating:</label>
                  <select
                    className="border border-accent/30 rounded p-1 text-sm"
                    onChange={(e) =>
                      setReview({ ...review, rating: Number(e.target.value) })
                    }
                    value={review.rating}
                  >
                    <option value="5">5 ⭐</option>
                    <option value="4">4 ⭐</option>
                    <option value="3">3 ⭐</option>
                    <option value="2">2 ⭐</option>
                    <option value="1">1 ⭐</option>
                  </select>
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm"
                  onClick={async (e) => {
                    e.preventDefault();
                    const finalReview = { ...review, product: product._id };
                    await addReview(
                      finalReview,
                      setLoading,
                      setReviews,
                      product._id
                    );
                    setReview({
                      rating: 4,
                      comment: "",
                      media: [],
                      user: null,
                    });
                  }}
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Products */}
      <Card className="shadow-md border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary titlefont">
            Recommended Products
          </h3>
          {recommendedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommendedProducts.map((prod) => (
                <Card key={prod._id} className="p-4 shadow border">
                  <img
                    src={prod.images?.[0] || "https://via.placeholder.com/150"}
                    alt={prod.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <div className="mt-2 text-sm">
                    <h4 className="font-semibold text-green-800">
                      {prod.name}
                    </h4>
                    <p className="text-gray-600">₹{prod.price}</p>
                    <Button
                      size="sm"
                      className="mt-2 bg-blue-500 text-white w-full"
                      onClick={() => {
                        localStorage.setItem("product", JSON.stringify(prod));
                        router.push("/store/product");
                      }}
                    >
                      View
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No recommendations yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
