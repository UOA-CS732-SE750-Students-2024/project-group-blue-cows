"use client";

import AltPage from "@/components/misc/AltPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Catches errors thrown in pages and child layouts
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <AltPage header="500 - Internal Server Error" subtitle={error.message}>
      <div className="flex gap-5">
        <Button onClick={reset}>Try Again</Button>
        <Link href="/"><Button>Go Home</Button></Link>
      </div>
    </AltPage>
  );
}