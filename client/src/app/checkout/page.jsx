'use client';

// checkout page

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const handleCheckout = async () => {
  const res = await fetch('/api/payment/checkout', {
    method: 'POST',
  });
  const data = await res.json();

  const stripe = await stripePromise;
  await stripe.redirectToCheckout({ sessionId: data.sessionId });
};

export default function CheckoutButton() {
  return (
    <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">
      Buy Now ₹499
    </button>
  );
}
