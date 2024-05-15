import AltPage from "@/components/misc/AltPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotSignedIn() {
  return (
    <AltPage
      header="401 - Unauthorised"
      subtitle="Please sign in or register to access this page."
    >
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </AltPage>
  );
}
