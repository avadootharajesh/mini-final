import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    // console.log("POST request received to /api/payment/checkout");
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: body.product ? body.product.name : 'Cart Items',
            },
            unit_amount: body.total * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: body.product ? `${process.env.NEXT_PUBLIC_URL}/success` : `${process.env.NEXT_PUBLIC_URL}/store/cart/success`,
      cancel_url: body.product ? `${process.env.NEXT_PUBLIC_URL}/cancel` : `${process.env.NEXT_PUBLIC_URL}/store/cart/cancel`,
    });
    // console.log("✅ Stripe Session Created:", session.id);
    return NextResponse.json({
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Error creating Stripe Session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
