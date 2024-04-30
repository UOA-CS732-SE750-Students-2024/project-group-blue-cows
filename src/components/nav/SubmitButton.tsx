"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function ReturnButton() {
  const router = useRouter();
  // TODO - Implement a function that will submit the form data to the server
  return (
    <div>
      <Button
        variant="default"
        className=" bg-blue-500 text-white"
        onClick={router.back}
      >
        {"Submit >"}
      </Button>
    </div>
  );
}
