"use client";

import AltPage from "@/components/misc/AltPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Catches if a user is unauthorised to view a page
export default function UnauthorisedUserPage() {
  return (
    <AltPage
      header="Administrator Access Only"
      subtitle={"You do not have permission to view this page."}
    >
      <div className="flex gap-5">
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </AltPage>
  );
}
