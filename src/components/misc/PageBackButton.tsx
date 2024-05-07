"use client";
import "client-only";
import { useRouter } from "next/router";
import { BackButton } from "./buttons";

interface PageBackButtonProps {
  href: string;
  className?: string;
}

export function PageBackButton({ href, className }: PageBackButtonProps) {
  const router = useRouter();
  return (
    <BackButton
      className={`hidden lg:block ${className}`}
      onClick={() => router.push(href)}
    />
  );
}
