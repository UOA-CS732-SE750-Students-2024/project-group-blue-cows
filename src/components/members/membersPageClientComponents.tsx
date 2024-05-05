"use client";
import { useRouter } from "next/navigation";
import { BackButton, YellowButton } from "../misc/buttons";
import { Club } from "@/schemas/clubSchema";
import { downloadAsCsv } from "@/util/csvUtils";
import { getAllMembers } from "@/services/clubServices";

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

export function ExportButton({ club, className }: { club: Club, className?: string }) {
  async function exportMembers() {
    downloadAsCsv(
      await getAllMembers(club.id),
      `${club.name}_membership.csv`
    );
  }

  return (
    <YellowButton onClick={exportMembers} className={`w-[24rem] ${className}`}>
      Export Data
    </YellowButton>
  );
}