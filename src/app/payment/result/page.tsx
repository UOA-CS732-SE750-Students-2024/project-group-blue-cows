"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentResultPage() {
  // Styled payment result page
  // Grab the query params from the URL - should contain the payment status, message and optionally the club name and membership ID

  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");
  const clubName = searchParams.get("clubName");
  const membershipId = searchParams.get("membershipId");

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-4xl text-primary font-bold">
          Registration successful!
        </h1>
        <p className="text-lg">You&apos;re now a member of {clubName}! 🎉</p>
        <Link href="/users/me/clubs">
          <Button className="text-white text-lg">View your memberships</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-4xl text-primary font-bold">
        Oops something bad happened!
      </h1>
      <p className="text-lg">
        {message || "An error occurred while processing your payment."}
      </p>
      {membershipId ? (
        <Link href={`/payment/${membershipId}/checkout`}>
          <Button>Try payment again</Button>
        </Link>
      ) : null}
    </div>
  );
}
