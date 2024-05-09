// This handles web hook notifications from Stripe
import { db } from "@/config/db";
import { STRIPE_WEBHOOK_SECRET } from "@/config/env";
import { stripe } from "@/config/stripe";
import membershipSchema from "@/schemas/membershipSchema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.text();

    // The signature verifies that the event was sent by Stripe
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        {
          message: "No stripe signature",
        },
        {
          status: 400,
        }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );

    // We only care about handling when the checkout session is completed
    if (event.type === "checkout.session.completed") {
      const membershipId = event.data.object?.client_reference_id;

      if (!membershipId) {
        return NextResponse.json(
          {
            message: "No client_reference_id in checkout event",
          },
          {
            status: 400,
          }
        );
      }

      // Set the membership as paid
      const response = await db
        .update(membershipSchema)
        .set({
          paid: true,
        })
        .where(eq(membershipSchema.id, Number(membershipId)));
      return NextResponse.json({ message: "Webhook handled successfully" });
    }
    // For any other event return a 200 response as soon as possible
    return NextResponse.json({ message: "Event ignored" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Unknown error handling Stripe webhook event",
      },
      { status: 500 }
    );
  }
}
