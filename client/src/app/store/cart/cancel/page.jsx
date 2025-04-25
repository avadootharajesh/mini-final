"use client";

import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <div className="bg-red-100 p-6 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          ❌ Payment Cancelled
        </h1>
        <p className="text-gray-700 mb-6">
          Looks like your payment didn’t go through.
        </p>
        <button
          onClick={() => router.push("/store")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-lg"
        >
          Back to Store
        </button>
      </div>
    </div>
  );
}
