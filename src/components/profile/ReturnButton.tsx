"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function ReturnButton() {
  const router = useRouter();
  return (
    <div>
      <Button
        variant="destructive"
        className="text-white"
        onClick={router.back}
      >
        {"< Return"}
      </Button>
    </div>
  );
}
