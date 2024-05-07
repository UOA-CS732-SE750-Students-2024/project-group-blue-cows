"use client";
import { useRouter } from "next/navigation";
import { BackButton, YellowButton } from "../misc/buttons";
import { Club } from "@/schemas/clubSchema";
import { getAllMembers, importClubMembers } from "@/services/clubServices";
import { downloadAsCsv, importFile } from "@/util/csvClientUtils";
import { showToastDemo, toastError, toastLoading, toastSuccess } from "@/util/toastUtils";
import { useRef, useState } from "react";
import { useMemberPage } from "./MemberPageContext";
import { importCsvFile } from "@/util/csvUtils";

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
      onClick={() => router.push(`/clubs/${clubId}`)}
    />
  );
}

export function ImportButton({
  club,
  className,
}: {
  club: Club;
  className?: string;
}) {
  const { setMembers } = useMemberPage();

  const handleImportMembers = () => {
    importFile(async (formData: FormData) => {
      toastLoading();
      try {
        if (!club.id) throw new Error("Club ID not found");
        const membersData = await importCsvFile(formData);
        await importClubMembers(club.id, membersData);
        setMembers(membersData);
        toastSuccess("Members imported successfully");
      } catch (error) {
        toastError("Error importing CSV");
      }
    });
  };

  return (
    <YellowButton
      onClick={handleImportMembers}
      className={`w-[24rem] ${className}`}
    >
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
