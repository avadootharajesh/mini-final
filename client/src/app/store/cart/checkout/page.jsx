"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutCartPage() {
  const [cartData, setCartData] = useState(null);
  const [expectedDate, setExpectedDate] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    address5: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartCheckout"));
    if (stored) setCartData(stored);

    const daysToAdd = Math.floor(Math.random() * 6) + 3;
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    setExpectedDate(date.toDateString());
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "checkoutDetails",
      JSON.stringify({
        items: cartData.items,
        total: cartData.total,
        expectedDate,
        userId: cartData.userId,
        shippingAddress: {
          fullName: formData.fullName,
          mobile: formData.mobile,
          addressLines: [
            formData.address1,
            formData.address2,
            formData.address3,
            formData.address4,
            formData.address5,
          ],
          email: formData.email,
        },
      })
    );
    router.push("/store/cart/checkout/payment");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Cart Checkout</h2>

      {cartData ? (
        <div className="space-y-4">
          {cartData.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center space-x-4 border p-4 rounded"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">
                  ₹{item.price} x {item.quantity}
                </p>
                <p className="font-medium">
                  Subtotal: ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}

          <p className="text-right text-lg font-bold mt-4">
            Total Price: ₹{cartData.total}
          </p>
        </div>
      ) : (
        <p>No cart data found.</p>
      )}

      <div className="space-y-4 pt-6">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          className="w-full p-2 border rounded"
          value={formData.mobile}
          onChange={handleInputChange}
          required
        />
        {[1, 2, 3, 4, 5].map((num) => (
          <input
            key={num}
            type="text"
            name={`address${num}`}
            placeholder={`Address Line ${num}`}
            className="w-full p-2 border rounded"
            value={formData[`address${num}`]}
            onChange={handleInputChange}
            required
          />
        ))}
      </div>

      <p className="text-sm text-gray-700 mt-2">
        Expected delivery: <span className="font-semibold">{expectedDate}</span>{" "}
        (within 3–8 days)
      </p>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-3 rounded text-lg hover:bg-green-700"
      >
        Proceed to Pay
      </button>
    </form>
  );
}
