import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentResultPage() {
  // Styled payment result page
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-4xl text-primary font-bold">
        Oops something bad happened!
      </h1>
      <p className="text-lg">
        It appears you cancelled the payment process.
        <br />
        We've saved your details but you'll need to pay to activate your
        membership.
      </p>
      <Link href="/payment">
        <Button className="text-white text-lg">Try again</Button>
      </Link>
    </div>
  );
}
