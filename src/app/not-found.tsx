import AltPage from "@/components/misc/AltPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <AltPage
      header="404 - Page Not Found"
      subtitle="The page you are looking for does not exist."
    >
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </AltPage>
  );
}
