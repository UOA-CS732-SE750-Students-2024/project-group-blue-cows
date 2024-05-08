import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentResultPage() {
  // Styled payment result page
  // Grab the query params from the URL - should contain the payment status, message and optionally the club name and membership ID
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("status");
  const message = urlParams.get("message");
  const clubName = urlParams.get("club");
  const membershipId = urlParams.get("membershipId");

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-4xl text-primary font-bold">Payment successful!</h1>
        <p className="text-lg">You're now a member of {clubName}! 🎉</p>
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
