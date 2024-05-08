"use client";
import { Club } from "@/schemas/clubSchema";
import { getAllMembers, importClubMembers } from "@/services/clubServices";
import { downloadAsCsv, importFile } from "@/util/csvClientUtils";
import { importCsvFile } from "@/util/csvUtils";
import { confirm } from "@/util/modalUtils";
import { toastError, toastLoading, toastSuccess } from "@/util/toastUtils";
import { useRouter } from "next/navigation";
import { BackButton, YellowButton } from "../misc/buttons";
import { useMemberPage } from "./MemberPageContext";

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

  async function confirmImport() {
    return confirm({
      title: "Import Registration Data?",
      content: (
        <div className="text-[1rem] leading-6 py-4 px-2">
          <p className="mb-2">
            This will overwrite any members with matching email addresses
            already in the system.
          </p>
          <p>
            You cannot overwrite core member data, including name, email, UPI,
            Year, and Student ID.
          </p>
        </div>
      ),
      className: "w-[32rem] h-[18rem]",
    });
  }

  const handleImportMembers = () => {
    importFile(async (formData: FormData) => {
      if (await confirmImport()) {
        toastLoading();
        try {
          const membersData = await importCsvFile(formData);
          await importClubMembers(club.id, membersData);
          setMembers(membersData);
          toastSuccess("Members imported successfully");
        } catch (error) {
          toastError("Error importing CSV");
        }
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
