"use client";

import {
  ShoppingCart,
  Star,
  Truck,
  LogOut,
  Home,
  CreditCard,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchProducts } from "../../../actions/storeActions";
import { getAuthenticatedUser } from "../../../actions/loginActions";
import { buyNow, addToCart as addToCartAction, getCartSize } from "./functions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

import useProductStore from "@/lib/zustand";
import StoreNavbar from "@/components/pages/store/StoreNavbar"; // Import the updated navbar

export default function StorePage() {
  const [cartSize, setCartSize] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1); // For tracking focused index in suggestions

  const router = useRouter();

  const addToCart = (productId) => {
    addToCartAction(user._id, productId);
    getCartSize(user._id).then((size) => setCartSize(size));
    toast.success("Product added to cart!");
  };

  const handleBuyNow = (product) => {
    localStorage.setItem(
      "checkoutItem",
      JSON.stringify({
        ...product,
        quantity: 1,
      })
    );
    useProductStore((state) => state.setProducts)(products);
    router.push("/store/checkout");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredSuggestions([]);
      return;
    }

    const suggestions = products.filter((product) => {
      const inName = product.name.toLowerCase().includes(query);
      const inTags = product.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );
      return inName || inTags;
    });

    setFilteredSuggestions(suggestions.slice(0, 5)); // Limit suggestions
    setFocusedIndex(-1); // Reset focus index when search query changes
  };

  const handleSearchSelect = (product) => {
    localStorage.setItem("product", JSON.stringify(product));
    router.push(`/store/product`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setFocusedIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      handleSearchSelect(filteredSuggestions[focusedIndex]);
    }
  };

  useEffect(() => {
    fetchProducts().then(setProducts);
    getAuthenticatedUser().then((currUser) => {
      setUser(currUser);
      getCartSize(currUser._id).then((size) => {
        console.log("Cart size:", size);
        setCartSize(size);
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#E3DAC9]">
      {/* Navbar */}
      <StoreNavbar
        cartSize={cartSize}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto p-8 relative">
        <div className="relative flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown} // Add onKeyDown event listener
            className="p-3 w-full max-w-md rounded-full border-2 border-[#00693E] focus:ring-2 focus:ring-[#2E8B57] focus:outline-none text-black transition-all duration-300"
          />
          <Search className="absolute top-3 right-3 text-[#00693E]" size={20} />
        </div>
        {/* Search Suggestions */}
        {filteredSuggestions.length > 0 && (
          <div className="absolute bg-white border-2 border-[#00693E] rounded-lg shadow-lg w-full max-h-48 overflow-auto z-10">
            <ul>
              {filteredSuggestions.map((product, index) => (
                <li
                  key={product._id}
                  className={`p-3 cursor-pointer transition-all duration-200 ${
                    focusedIndex === index
                      ? "bg-[#2E8B57] text-white"
                      : "hover:bg-[#2E8B57] hover:text-white"
                  }`}
                  onClick={() => handleSearchSelect(product)}
                  onMouseEnter={() => setFocusedIndex(index)} // Highlight on hover
                >
                  {product.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Store Products */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products &&
            products.map((product) => (
              <Card
                key={product._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform border-0"
                onClick={() => {
                  localStorage.setItem("product", JSON.stringify(product));
                  router.push(`/store/product`);
                }}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-semibold text-[#00693E]">
                    {product.name}
                  </CardTitle>
                  <p className="text-[#00693E] font-bold text-lg">
                    ₹{product.price}
                  </p>
                  <div className="flex items-center gap-1 text-[#2E8B57]">
                    {Array.from({ length: Math.round(product.rating) }).map(
                      (_, i) => (
                        <Star key={i} size={16} fill="#A0785A" stroke="none" />
                      )
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 mt-4 w-full">
                    <Button
                      className="w-full bg-[#2E8B57] hover:bg-[#00693E]"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product._id);
                      }}
                    >
                      Add to Cart <ShoppingCart className="ml-2" size={16} />
                    </Button>
                    <Button
                      className="w-full bg-[#00693E] hover:bg-[#004d2c] text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(product);
                      }}
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Promo */}
        <div className="mt-10 p-6 bg-[#355E3B] text-[#E3DAC9] rounded-xl text-center">
          <h2 className="text-2xl font-bold">
            🚚 Free Shipping on orders over ₹50!
          </h2>
          <p className="mt-2 text-sm flex items-center justify-center gap-2">
            <Truck size={20} /> Order now and receive it within 3-5 business
            days.
          </p>
        </div>
      </div>
    </div>
  );
}
