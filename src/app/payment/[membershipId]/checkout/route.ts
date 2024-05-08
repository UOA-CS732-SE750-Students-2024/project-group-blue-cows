import { db } from "@/config/db";
import { AppUser } from "@/schemas/authSchema";
import clubSchema, { Club } from "@/schemas/clubSchema";
import membershipSchema, { Membership } from "@/schemas/membershipSchema";
import { auth } from "@/util/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

// Import the Stripe library
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key not found in environment variables.");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// We don't want to cache this route
export const dynamic = "force-dynamic";

// GET /api/payment/[membershipId]/checkout
// Get the Stripe checkout URL for a membership
export async function GET(
  request: Request,
  { params }: { params: { membershipId: string } }
) {
  // Check if the user is authenticated
  const session = await auth();
  const user = session?.user as AppUser;

  if (!user) {
    return new Response("Unauthorized. You must be authenticated.", {
      status: 401,
    });
  }

  // Get the membership ID from the URL
  const { membershipId } = params;

  // Check if the membership ID is valid
  if (!membershipId) {
    return new Response("Membership ID must be supplied.", { status: 400 });
  }

  // Grab the membership from the database
  const membershipResponse = await db
    .select()
    .from(membershipSchema)
    .where(eq(membershipSchema.id, Number(membershipId)));

  // Sanity check - should never get more than one membership
  if (membershipResponse.length > 1) {
    return new Response("More than one membership found. Bad DB state.", {
      status: 500,
    });
  }

  // Check if the membership exists
  if (membershipResponse.length === 0) {
    return new Response("Membership not found.", { status: 404 });
  }

  const membership: Membership = membershipResponse[0];

  // Check if the user is authorized to view this membership
  if (membership.user !== user.id) {
    return new Response(
      "Unauthorized. You do not have permission to modify this membership.",
      { status: 403 }
    );
  }

  // Check if the membership has already been paid for
  if (membership.paid) {
    return new Response("Membership has already been paid for.", {
      status: 400,
    });
  }

  // Get the membership fee from the DB
  const clubResponse = await db
    .select()
    .from(clubSchema)
    .where(eq(clubSchema.id, membership.club));

  // Sanity check - should never get more than one club
  if (clubResponse.length > 1) {
    return new Response("More than one club found. Bad DB state.", {
      status: 500,
    });
  }

  // Check if the club exists
  if (clubResponse.length === 0) {
    return new Response("Club not found. Bad DB state.", { status: 404 });
  }

  const club = clubResponse[0];
  const membershipFee = club.membership_fee;
  const productName = `${club.name} Membership Fee`;

  // Create a Stripe session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "NZD",
          product_data: {
            name: productName,
          },
          unit_amount_decimal: String(Number(membershipFee) * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/payment?success=true`,
    cancel_url: `http://localhost:3000/payment/?canceled=true`,
  });

  if (!checkoutSession.url) {
    return new Response("Error creating Stripe session.", { status: 500 });
  }

  redirect(checkoutSession.url);
}
