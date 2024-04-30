"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function ReturnButton() {
  const router = useRouter();
  return (
    <div>
      <Button
        variant="default"
        className=" bg-blue-500 text-white"
        onClick={router.back}
      >
        {"< Return"}
      </Button>
    </div>
  );
}
