"use client";
import { useRouter } from "next/navigation";
import { BackButton, YellowButton } from "../misc/buttons";

export function MembersPageBack({
  clubId,
  className,
}: {
  clubId: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <BackButton
      className={`hidden lg:block ${className}`}
      onClick={() => router.push(`http://localhost:3000/clubs/${clubId}`)}
    />
  );
}

export function ImportButton({ className }: { className?: string }) {
  return <YellowButton className={`w-[24rem] ${className}`}>Import Data</YellowButton>;
}

export function ExportButton({ className }: { className?: string }) {
  return <YellowButton className={`w-[24rem] ${className}`}>Export Data</YellowButton>;
}
