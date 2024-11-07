import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import prisma from "@/libs/prismadb";  // Ensure prisma is imported from the correct path

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15" as Stripe.LatestApiVersion
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Convert request body to a buffer for Stripe signature verification
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("Missing the Stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", errorMessage);
    return res.status(400).send(`Webhook error: ${errorMessage}`);
  }

  switch (event.type) {
    case "charge.succeeded": {
      const charge = event.data.object as Stripe.Charge;

      if (typeof charge.payment_intent === "string") {
        try {
          await prisma.order.update({
            where: { paymentIntentId: charge.payment_intent },
            data: {
              status: "complete",
              address: charge.shipping?.address ? {
                city: charge.shipping.address.city || "",
                country: charge.shipping.address.country || "",
                line1: charge.shipping.address.line1 || "",
                line2: charge.shipping.address.line2 || "",
                postal_code: charge.shipping.address.postal_code || "",
                state: charge.shipping.address.state || "",
              } : null,
            },
          });
        } catch (err) {
          console.error("Error updating order:", err);
          return res.status(500).json({ error: "Failed to update order" });
        }
      }
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
}
