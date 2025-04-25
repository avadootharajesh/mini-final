"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getAuthenticatedUser } from "../../../../../actions/loginActions";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function SuccessPage() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Clear cart and checkout data
    localStorage.removeItem("cartCheckout");
    localStorage.removeItem("checkoutDetails");

    getAuthenticatedUser().then((user) => {
      axios
        .delete("/api/cart", { params: { userId: user._id } })
        .then(() => {});
    });

    // delete cart + add orders to database
    if (Cookies.get("checkoutData")) {
      const checkoutData = JSON.parse(Cookies.get("checkoutData"));
      const userId = checkoutData.userId;
      const items = checkoutData.items;
      const totalAmount = checkoutData.totalAmount;
      const shippingAddress = checkoutData.shippingAddress;
      const boughtAt = new Date().toISOString();
      // for every item, call api and send data
      const orders = {
        userId,
        items: items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          priceAtPurchase: item.price,
        })),
        totalAmount,
        boughtAt,
        shippingAddress,
      };
      axios.post("/api/cartorders", orders).then(() => {
        toast.success("Order successful!");
      });
    } else {
      toast.error("Error processing data. Please head over to store.");
      router.push("/store");
    }
    Cookies.remove("checkoutData");
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <div className="bg-green-100 p-6 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🎉 Order Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your items will be delivered soon.
        </p>
        <button
          onClick={() => router.push("/store")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-lg"
        >
          Back to Store
        </button>
      </div>
    </div>
  );
}
