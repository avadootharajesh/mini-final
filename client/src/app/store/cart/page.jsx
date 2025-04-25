"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { getAuthenticatedUser } from "../../../../actions/loginActions";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [expectedDate, setExpectedDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Calculate delivery date ONCE
    const randomDays = Math.floor(Math.random() * 6) + 3; // 3 to 8 days
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + randomDays);
    setExpectedDate(deliveryDate.toDateString());
  }, []);

  useEffect(() => {
    getAuthenticatedUser().then((user) => {
      setUser(user);
      axios
        .get("/api/cart", {
          params: { userId: user._id },
        })
        .then((response) => {
          setCart([]);
          setCart(response.data.data);
          console.log("Fetched cart:", response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    });
  }, []);

  const updateQuantity = (id, qty) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: qty } : item
    );
    setCart(updated);
  };

  const handleProductClick = (product) => {
    console.log("Product clicked:", product);
    // Optional: router.push(`/store/product?productId=${product._id}`);
  };

  const handleBuyNow = (product) => {
    const checkoutData = {
      ...product,
      price: product.price * product.quantity,
    };
    localStorage.setItem("checkoutItem", JSON.stringify(checkoutData));
    router.push("/store/checkout");
  };

  const handleCheckoutCart = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const cartData = {
      items: cart,
      total,
    };
    localStorage.setItem("cartCheckout", JSON.stringify({
      ...cartData,
      userId: user._id
    }));
    router.push("/store/cart/checkout");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#F5F5DC] p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#355E3B]">🛒 Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* All Cart Items */}
        <div className="flex-1 grid gap-6">
          {cart.map((product) => (
            <Card
              key={product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition"
              onClick={() => handleProductClick(product)}
            >
              <div className="flex gap-4 p-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold text-[#355E3B]">
                    {product.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <label htmlFor={`qty-${product._id}`} className="text-sm">
                      Quantity:
                    </label>
                    <input
                      id={`qty-${product._id}`}
                      type="number"
                      min={1}
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product._id, parseInt(e.target.value))
                      }
                      className="border px-2 py-1 rounded w-16"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="ml-auto text-[#00693E] font-bold">
                      ₹{product.price * product.quantity}
                    </span>
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="default"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(product);
                      }}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Checkout Cart Summary */}
        <div className="w-full lg:w-[300px] bg-white shadow-lg p-6 rounded-xl h-fit">
          <h2 className="text-xl font-bold text-[#355E3B] mb-2">
            🧾 Cart Summary
          </h2>
          <p className="text-md text-gray-700 mb-2">
            Total Items: <strong>{cart.length}</strong>
          </p>
          <p className="text-md text-gray-700 mb-2">
            Total Price: <strong>₹{totalPrice}</strong>
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Expected Delivery: <strong>{expectedDate}</strong>
          </p>
          <Button
            variant="default"
            className="w-full"
            onClick={handleCheckoutCart}
          >
            Checkout Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
