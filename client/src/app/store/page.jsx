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

export default function StorePage() {
  const [cartSize, setCartSize] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

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
    useProductStore(state => state.setProducts)(products);
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
      const inTags = product.tags.some((tag) => tag.toLowerCase().includes(query));
      return inName || inTags;
    });

    setFilteredSuggestions(suggestions.slice(0, 5)); // Limit suggestions
  };

  const handleSearchSelect = (product) => {
    localStorage.setItem("product", JSON.stringify(product));
    router.push(`/store/product`);
  };

  useEffect(() => {
    fetchProducts().then(setProducts);
    getAuthenticatedUser().then((currUser) => {
      setUser(currUser);
      getCartSize(currUser._id).then(setCartSize);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#E3DAC9]">
      {/* Navbar */}
      <nav className="bg-[#355E3B] text-[#E3DAC9] p-4 shadow-md flex justify-between items-center relative">
        <h1 className="text-2xl font-bold">The Cozy Store 🍭️</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 rounded-md border-none focus:outline-none text-black"
            />
            <Search className="absolute top-2 right-2 text-gray-500" size={16} />
            {filteredSuggestions.length > 0 && (
              <ul className="absolute top-10 left-0 z-10 bg-white text-black border w-full rounded shadow-md max-h-48 overflow-auto">
                {filteredSuggestions.map((product) => (
                  <li
                    key={product._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSearchSelect(product)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button
            variant="ghost"
            className="text-[#E3DAC9] hover:bg-[#2E8B57]"
            onClick={() => router.push("/dashboard")}
          >
            <Home className="mr-2" size={16} /> Home
          </Button>
          <Button
            variant="ghost"
            className="text-[#E3DAC9] hover:bg-[#2E8B57]"
            onClick={() => router.push("/store/cart")}
          >
            <ShoppingCart className="mr-2" size={16} /> Cart ({cartSize})
          </Button>
          <Button
            variant="ghost"
            className="text-[#E3DAC9] hover:bg-[#2E8B57]"
            onClick={() => router.push("/store/orders")}
          >
            <CreditCard className="mr-2" size={16} /> Orders
          </Button>
          <Button variant="ghost" className="text-[#E3DAC9] hover:bg-[#2E8B57]">
            <LogOut className="mr-2" size={16} /> Logout
          </Button>
        </div>
      </nav>

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
                  <p className="text-[#00693E] font-bold text-lg">₹{product.price}</p>
                  <div className="flex items-center gap-1 text-[#2E8B57]">
                    {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
                      <Star key={i} size={16} fill="#A0785A" stroke="none" />
                    ))}
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
          <h2 className="text-2xl font-bold">🚚 Free Shipping on orders over ₹50!</h2>
          <p className="mt-2 text-sm flex items-center justify-center gap-2">
            <Truck size={20} /> Order now and receive it within 3-5 business days.
          </p>
        </div>
      </div>
    </div>
  );
}