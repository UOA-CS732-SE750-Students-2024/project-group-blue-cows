"use client";
import { useRouter } from "next/navigation";
import { BackButton, BlueButton, YellowButton } from "../misc/buttons";
import { Club } from "@/schemas/clubSchema";
import { useRegistrationEditContext } from "@/components/form/RegistratonEditContext";
import { getAllMembers, importClubMembers } from "@/services/clubServices";
import { toastError, toastLoading, toastSuccess } from "@/util/toastUtils";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";
import { useMemberPage } from "./MemberPageContext";
import { downloadAsCsv, importFile } from "@/util/csvClientUtils";
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

export function PreviewFormButton({ className }: { className?: string }) {
  const { showPreview, setShowPreview } = useRegistrationEditContext();

  function togglePreview() {
    setShowPreview(!showPreview);
  }

  return (
    <YellowButton onClick={togglePreview} className={`w-[24rem] ${className}`}>
      {showPreview ? "Edit" : "Preview"}
    </YellowButton>
  );
}

export function SaveFormButton({ className }: { className?: string }) {
  const { extendedFields } = useRegistrationEditContext();
  const { data: sessionData } = useSession();
  const user = sessionData?.user as AppUser;

  async function save() {
    try {
      console.log(extendedFields);
      // await postExtendedFormFields(extendedFields, club, user); // AlexHope look here - can you write this API?
      toastSuccess("Form saved successfully");
    } catch (error) {
      toastError("Error saving. Are you logged in?");
    }
  }

  return (
    <BlueButton onClick={save} className={`w-[24rem] ${className}`}>
      Save
    </BlueButton>
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
        console.log(membersData)
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
