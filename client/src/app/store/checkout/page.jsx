"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthenticatedUser } from "../../../../actions/loginActions";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [expectedDate, setExpectedDate] = useState("");
  const [user, setUser] = useState(null);

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

  const router = useRouter();

  useEffect(() => {
    const storedProduct = JSON.parse(localStorage.getItem("checkoutItem"));
    if (storedProduct) {
      setProduct(storedProduct);
      setQuantity(storedProduct.quantity);
    } else {
      toast.error("Product not found!");
      router.push("/store");
    }

    getAuthenticatedUser().then((user) => setUser(user));

    const minDays = 3;
    const maxDays = 8;
    const daysToAdd =
      Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    setExpectedDate(date.toDateString());
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) setQuantity(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form refresh
    localStorage.setItem(
      "checkoutDetails",
      JSON.stringify({
        quantity,
        price: product.price * quantity,
        product: product,
        userId: user._id,
        boughtAt: new Date().toISOString(),
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
    router.push("/store/checkout/payment");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {product ? (
        <div className="flex items-center space-x-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">Unit Price: ₹{product.price}</p>
            <div className="flex items-center mt-2">
              <label className="mr-2">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 px-2 py-1 border rounded"
                required
              />
            </div>
            <p className="mt-2 font-medium">
              Total: ₹{product.price * quantity}
            </p>
          </div>
        </div>
      ) : (
        <p>No product selected.</p>
      )}

      <div className="space-y-4">
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
