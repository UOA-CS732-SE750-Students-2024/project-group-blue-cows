"use client";
import { useRouter } from "next/navigation";
import { BackButton, YellowButton } from "../misc/buttons";
import { Club } from "@/schemas/clubSchema";
import { getAllMembers } from "@/services/clubServices";
import { downloadAsCsv } from "@/util/csvClientUtils";
import { toastError } from "@/util/toastUtils";

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
  function importMembers() {
    console.log("Clicked")
  }

  return (
    <YellowButton onClick={importMembers} className={`w-[24rem] ${className}`}>
      Import Data
    </YellowButton>
  );
}

export function ExportButton({
  club,
  className,
}: {
  club: Club;
  className?: string;
}) {
  async function exportMembers() {
    try {
      const { headers, membersData } = await getAllMembers(club.id);
      downloadAsCsv(headers, membersData, `${club.name}_membership.csv`);
    } catch (error) {
      toastError("Error exporting CSV");
    }
  }

  return (
    <YellowButton onClick={exportMembers} className={`w-[24rem] ${className}`}>
      Export Data
    </YellowButton>
  );
}