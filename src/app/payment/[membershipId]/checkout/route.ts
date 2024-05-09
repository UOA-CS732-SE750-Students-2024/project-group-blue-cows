import { db } from "@/config/db";
import { AppUser } from "@/schemas/authSchema";
import clubSchema, { Club } from "@/schemas/clubSchema";
import membershipSchema, { Membership } from "@/schemas/membershipSchema";
import { auth } from "@/util/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { stripe } from "@/config/stripe";
import absoluteUrl from "next-absolute-url";
import { NextApiRequest } from "next";

enum PaymentOutcome {
  SUCCESS,
  ERROR,
}

function getRedirectUrl(
  request: NextApiRequest,
  status: PaymentOutcome,
  message: string,
  clubName?: string,
  membershipId?: string
): string {
  const baseUrl = new URL(absoluteUrl(request).origin);
  baseUrl.pathname = "/payment/result";
  switch (status) {
    case PaymentOutcome.SUCCESS:
      baseUrl.searchParams.set("status", "success");
      break;
    case PaymentOutcome.ERROR:
      baseUrl.searchParams.set("status", "error");
  }

  if (clubName) {
    baseUrl.searchParams.set("clubName", clubName);
  }
  if (membershipId) {
    baseUrl.searchParams.set("membershipId", membershipId);
  }
  baseUrl.searchParams.set("message", message);

  return baseUrl.toString();
}

function redirectOutcome(
  request: NextApiRequest,
  status: PaymentOutcome,
  message: string,
  clubName?: string,
  membershipId?: string
) {
  const redirectUrl = getRedirectUrl(
    request,
    status,
    message,
    clubName,
    membershipId
  );

  redirect(redirectUrl);
}

// We don't want to cache this route
export const dynamic = "force-dynamic";

// GET /payment/[membershipId]/checkout
// Get the Stripe checkout URL for a membership
export async function GET(
  request: NextApiRequest,
  { params }: { params: { membershipId: string } }
) {
  // Check if the user is authenticated
  const session = await auth();
  const user = session?.user as AppUser;

  if (!user) {
    redirectOutcome(
      request,
      PaymentOutcome.ERROR,
      "You need to be logged in to pay for a membership."
    );
    return;
  }

  // Get the membership ID from the URL
  const { membershipId } = params;

  // Check if the membership ID is valid
  if (!membershipId) {
    redirectOutcome(
      request,
      PaymentOutcome.ERROR,
      "Failed to find the membership. Please try that one again."
    );
    return;
  }

  // Grab the membership from the database
  const membershipResponse = await db
    .select()
    .from(membershipSchema)
    .where(eq(membershipSchema.id, Number(membershipId)));

  // Sanity check - should never get more than one membership
  if (membershipResponse.length > 1) {
    redirectOutcome(
      request,
      PaymentOutcome.ERROR,
      "Failed to find the membership. Please try that one again."
    );
    return;
  }

  // Check if the membership exists
  if (membershipResponse.length === 0) {
    redirectOutcome(
      request,
      PaymentOutcome.ERROR,
      "Membership not found. Please try that one again."
    );
    return;
  }

  const membership: Membership = membershipResponse[0];

  // Check if the user is authorized to view this membership
  if (membership.user !== user.id) {
    redirectOutcome(
      request,
      PaymentOutcome.ERROR,
      "You do not have permission to access this membership."
    );
    return;
  }

  // Check if the membership has already been paid for
  if (membership.paid) {
    redirectOutcome(
      request,
      PaymentOutcome.ERROR,
      "Membership is already paid."
    );
    return;
  }

  // Get the membership fee from the DB
  const clubResponse = await db
    .select()
    .from(clubSchema)
    .where(eq(clubSchema.id, membership.club));

  // Sanity check - should never get more than one club
  if (clubResponse.length > 1) {
    redirectOutcome(
      request,
      PaymentOutcome.ERROR,
      "Failed to find club associated with the membership. Please try that one again."
    );
    return;
  }

  // Check if the club exists
  if (clubResponse.length === 0) {
    // Although this returns the same error message, I have separated it in case we want to handle it differently in the future
    redirectOutcome(
      request,
      PaymentOutcome.ERROR,
      "Failed to find club associated with the membership. Please try that one again."
    );
    return;
  }

  const club = clubResponse[0];
  const membershipFee = club.membership_fee;
  const productName = `${club.name} Membership Fee`;

  // Create a Stripe session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: user.email,
    // pass the membership ID so the webhook can update the membership as paid
    client_reference_id: membershipId,
    line_items: [
      {
        // each item represents a product in the cart
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
    success_url: getRedirectUrl(
      request,
      PaymentOutcome.SUCCESS,
      "Payment successful.",
      club.name,
      membershipId
    ),
    cancel_url: getRedirectUrl(
      request,
      PaymentOutcome.ERROR,
      "It appears you cancelled the transaction. Please try that one again.",
      club.name,
      membershipId
    ),
  });

  if (!checkoutSession.url) {
    redirectOutcome(
      request,
      PaymentOutcome.ERROR,
      "Error creating Stripe session.",
      club.name,
      membershipId
    );
    return;
  }

  redirect(checkoutSession.url);
}
