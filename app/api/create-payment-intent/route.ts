import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { CartProductType } from "@/app/product/[productid]/ProductDetails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15" as Stripe.LatestApiVersion,
});

const calculateOrderAmount = (items: CartProductType[]): number => {
  return items.reduce((acc: number, item: CartProductType) => {
    return acc + item.price * item.quantity;
  }, 0);
};

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { items, payment_intent_id }: { items: CartProductType[]; payment_intent_id?: string } = body;
    const total = calculateOrderAmount(items) * 100;

    console.log("Creating or updating payment intent...");
    console.log("Items:", items);
    console.log("Payment Intent ID:", payment_intent_id);

    let paymentIntent;
    if (payment_intent_id) {
      console.log("Updating existing payment intent with ID:", payment_intent_id);
      paymentIntent = await stripe.paymentIntents.update(payment_intent_id, { amount: total });
    } else {
      console.log("Creating new payment intent...");
      paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });
    }

    console.log("Payment Intent created/updated:", paymentIntent);

    await prisma.order.upsert({
      where: { paymentIntentId: paymentIntent.id },
      create: {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: "usd",
        status: "pending",
        deliveryStatus: "pending",
        paymentIntentId: paymentIntent.id,
        products: items,
      },
      update: {
        amount: total,
        products: items,
      },
    });

    return NextResponse.json({ paymentIntent });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Failed to create or update payment intent" }, { status: 500 });
  }
}
