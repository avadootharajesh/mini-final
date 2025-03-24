'use client'

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Truck } from "lucide-react";
import { useState } from "react";

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

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-[#E3DAC9] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#355E3B] mb-6 text-center">
          The Cozy Store 🛍️
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-[#DAC8AE] shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform"
            >
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold text-[#355E3B]">
                  {product.name}
                </CardTitle>
                <p className="text-[#00693E] font-bold text-lg">{product.price}</p>
                <div className="flex items-center gap-1 text-[#2E8B57]">
                  {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
                    <Star key={i} size={16} fill="#A0785A" stroke="none" />
                  ))}
                </div>
                <Button
                  className="mt-3 w-full bg-[#2E8B57] hover:bg-[#00693E]"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart <ShoppingCart className="ml-2" size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 p-6 bg-[#355E3B] text-[#E3DAC9] rounded-xl text-center">
          <h2 className="text-2xl font-bold">🚚 Free Shipping on orders over $50!</h2>
          <p className="mt-2 text-sm flex items-center justify-center gap-2">
            <Truck size={20} /> Order now and receive it within 3-5 business days.
          </p>
        </div>
      </div>
    </div>
  );
}