"use client";
import { useRouter } from "next/navigation";
import { BackButton, YellowButton } from "../misc/buttons";
import { Club } from "@/schemas/clubSchema";
import { getAllMembers, importClubMembers } from "@/services/clubServices";
import { downloadAsCsv } from "@/util/csvClientUtils";
import { showToastDemo, toastError } from "@/util/toastUtils";
import { useEffect, useRef, useState } from "react";

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
  const fileInput = useRef<HTMLInputElement>(null);
  const [selectFile, setSelectFile] = useState(false);

  const handleImportMembers = () => {
    setSelectFile(true);
  };

  const importMembers = async () => {
    console.log("test");
    const formData = new FormData();
    formData.append("file", fileInput?.current?.files?.[0]!);
    if (club.id) {
      showToastDemo("Loading... Refresh page when finish loading");
      await importClubMembers(club.id, formData);
      setSelectFile(false);
    }
  };

  return (
    <YellowButton
      onClick={handleImportMembers}
      className={`w-[24rem] ${className}`}
    >
      {selectFile ? (
        <label>
          <input
            className="ml-10"
            type="file"
            name="file"
            ref={fileInput}
            onChange={importMembers}
          />
        </label>
      ) : (
        `Import Data`
      )}
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
