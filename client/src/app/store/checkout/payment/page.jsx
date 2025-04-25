"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const [checkoutData, setCheckoutData] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();
  const hasMounted = useRef(false);

  useEffect(() => {
    const storedData = localStorage.getItem("checkoutDetails");
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    } else {
      router.push("/store/checkout");
    }

    // Prompt on page unload (reload/tab close only)
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Detect back button navigation
    const handlePopState = () => {
      const confirmed = window.confirm(
        "Are you sure you want to leave this page?"
      );
      if (!confirmed) {
        // Prevent navigation
      } else {
        // Allow navigation
        router.push("/store/");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Block initial mount triggering popstate workaround
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      history.pushState(null, "", location.href); // Push fake state
    }
  }, []);

  const handleStripeCheckout = async () => {
    try {
      const res = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: checkoutData.product,
          quantity: checkoutData.quantity,
          total: checkoutData.price,
        }),
      });

      const data = await res.json();
      const stripe = await stripePromise;
      Cookies.set("checkoutData", JSON.stringify(checkoutData));
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      toast.error("Error processing payment. Please try again.");
      router.push("/store");
      console.error(error);
    }
  };

  if (!checkoutData) return <p>Loading checkout details...</p>;

  return (
    <div className="max-w-xl h-screen mx-auto mt-10 p-4 border rounded shadow flex items-center justify-center flex-col">
      <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>

      <div className="mb-4">
        <p>
          <strong>Product:</strong> {checkoutData.product.name}
        </p>
        <p>
          <strong>Price per unit:</strong> ₹{checkoutData.price}
        </p>
        <p>
          <strong>Quantity:</strong> {checkoutData.quantity}
        </p>
        <p>
          <strong>Total:</strong> ₹{checkoutData.price}
        </p>
      </div>

      <p className="mb-4">Are you sure you want to proceed with the payment?</p>
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
