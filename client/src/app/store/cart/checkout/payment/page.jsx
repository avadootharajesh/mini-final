"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CartCheckoutConfirmationPage() {
  const [checkoutData, setCheckoutData] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();
  const hasMounted = useRef(false);

  useEffect(() => {
    const storedData = localStorage.getItem("checkoutDetails");
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    } else {
      router.push("/store/cart/checkout");
    }

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const handlePopState = () => {
      const confirmed = window.confirm(
        "Are you sure you want to leave this page?"
      );
      if (!confirmed) return;
      router.push("/store");
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      history.pushState(null, "", location.href);
    }
  }, []);

  const handleStripeCheckout = async () => {
    try{const res = await fetch("/api/payment/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: checkoutData.items,
        product: checkoutData.product,
        quantity: checkoutData.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
        total: checkoutData.total,
      }),
    });

    const data = await res.json();
    const stripe = await stripePromise;
    Cookies.set("checkoutData", JSON.stringify({
      userId: checkoutData.userId,
      items: checkoutData.items,
      totalAmount: checkoutData.total,
      shippingAddress: checkoutData.shippingAddress,
    }));
    await stripe.redirectToCheckout({ sessionId: data.sessionId });}
    catch(error){
      toast.error("Error processing payment. Please try again.");
      router.push("/store");
      console.log(error);
    }
  };

  if (!checkoutData) return <p>Loading checkout details...</p>;

  const totalQuantity = checkoutData.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="max-w-2xl h-screen mx-auto mt-10 p-4 border rounded shadow flex items-center justify-center flex-col">
      <h2 className="text-2xl font-bold mb-6">Confirm Your Cart Order</h2>

      <div className="w-full mb-6 space-y-4">
        {checkoutData.items.map((item) => (
          <div key={item._id} className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">
                ₹{item.price} × {item.quantity}
              </p>
            </div>
            <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
          </div>
        ))}
        <hr />
        <div className="flex justify-between mt-2 font-semibold">
          <p>Total Quantity:</p>
          <p>{totalQuantity}</p>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <p>Total Price:</p>
          <p>₹{checkoutData.total}</p>
        </div>
      </div>

      <p className="mb-4">Do you want to proceed to payment?</p>
      <div className="flex gap-4">
        <button
          onClick={() => setConfirmed(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Yes
        </button>
        <button
          onClick={() => {
            const leave = confirm("Are you sure you want to exit?");
            if (leave) router.push("/store");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          No
        </button>
      </div>

      {confirmed && (
        <div className="mt-6">
          <button
            onClick={handleStripeCheckout}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
}
