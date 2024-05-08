"use client";
import "client-only";
import { useRouter } from "next/navigation";
import { BackButton } from "./buttons";

interface PageBackButtonProps {
  className?: string;
}

export function PageBackButton({ className }: PageBackButtonProps) {
  const router = useRouter();
  return (
    <BackButton
      className={`hidden lg:block ${className}`}
      onClick={router.back}
    />
  );
}
