"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Star,
  Truck,
  LogOut,
  Home,
  CreditCard,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchProducts } from "../../../actions/storeActions";

const products = [
  {
    id: 1,
    name: "EcoSmart Mug 🌿",
    price: "$24.99",
    rating: 4.8,
    image: "https://source.unsplash.com/300x200/?mug,coffee",
  },
  {
    id: 2,
    name: "Minimalist Notebook 📖",
    price: "$14.99",
    rating: 4.6,
    image: "https://source.unsplash.com/300x200/?notebook,stationery",
  },
  {
    id: 3,
    name: "Classic Leather Wallet 👜",
    price: "$49.99",
    rating: 4.9,
    image: "https://source.unsplash.com/300x200/?wallet,leather",
  },
  {
    id: 4,
    name: "Aesthetic Table Lamp 💡",
    price: "$59.99",
    rating: 4.7,
    image: "https://source.unsplash.com/300x200/?lamp,desk",
  },
];

export default function StorePage() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const router = useRouter();

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    fetchProducts().then((products) => setProducts(products));

    let interval;
    setTimeout(() => {
      interval = setInterval(() => {
        console.log("Updating products...", products);
      }, 2000);
    });
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  }, []);

  return (
    <div className="min-h-screen bg-[#E3DAC9]">
      {/* Navigation Bar */}
      <nav className="bg-[#355E3B] text-[#E3DAC9] p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">The Cozy Store 🛍️</h1>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-[#E3DAC9] hover:bg-[#2E8B57]">
            <Home className="mr-2" size={16} /> Home
          </Button>
          <Button variant="ghost" className="text-[#E3DAC9] hover:bg-[#2E8B57]">
            <ShoppingCart className="mr-2" size={16} /> Cart ({cart.length})
          </Button>
          <Button variant="ghost" className="text-[#E3DAC9] hover:bg-[#2E8B57]">
            <CreditCard className="mr-2" size={16} /> Checkout
          </Button>
          <Button variant="ghost" className="text-[#E3DAC9] hover:bg-[#2E8B57]">
            <LogOut className="mr-2" size={16} /> Logout
          </Button>
        </div>
      </nav>

      {/* Store Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products &&
            products.map((product) => (
              <Card
                key={product._id}
                className="bg-[#DAC8AE] shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform"
                onClick={() => {
                  console.log("Product clicked:", product);
                  localStorage.setItem("product", JSON.stringify(product));
                  router.push(`/store/product`);
                }}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-semibold text-[#355E3B]">
                    {product.name}
                  </CardTitle>
                  <p className="text-[#00693E] font-bold text-lg">
                    {product.price}
                  </p>
                  <div className="flex items-center gap-1 text-[#2E8B57]">
                    {Array.from({ length: Math.round(product.rating) }).map(
                      (_, i) => (
                        <Star key={i} size={16} fill="#A0785A" stroke="none" />
                      )
                    )}
                  </div>
                  <Button
                    className="mt-3 w-full bg-[#2E8B57] hover:bg-[#00693E]"
                    onClick={() => addToCart(product)}>
                    Add to Cart <ShoppingCart className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Shipping Promo */}
        <div className="mt-10 p-6 bg-[#355E3B] text-[#E3DAC9] rounded-xl text-center">
          <h2 className="text-2xl font-bold">
            🚚 Free Shipping on orders over $50!
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
