"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthenticatedUser } from "../../../../actions/loginActions";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = await getAuthenticatedUser();
      if (!user) return;

      try {
        const res = await axios.get("/api/orders", {
          params: { userId: user._id },
        });
        if (res.data.status === 200) {
          setOrders(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading your orders...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-4 border rounded shadow bg-white"
            >
              <img
                src={order.productImage}
                alt={order.productName}
                className="w-24 h-24 object-cover rounded border"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-lg font-semibold">{order.productName}</p>
                  <p className="text-sm text-gray-600">
                    {order.productDescription}
                  </p>
                </div>
                <div className="text-sm mt-2 space-y-1">
                  <p>
                    <strong>Qty:</strong>{" "}
                    {
                      order.items.find((item) =>
                        item.productId.equals
                          ? item.productId.equals(order._id)
                          : item.productId.toString() === order._id.toString()
                      )?.quantity ?? "1"
                    }
                  </p>
                  <p>
                    <strong>Price:</strong> ₹
                    {
                      order.priceAtPurchase
                    }
                  </p>
                  <p>
                    <strong>Ordered on:</strong>{" "}
                    {new Date(order.boughtAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.paymentStatus}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
