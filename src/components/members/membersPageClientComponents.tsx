"use client";
import { useRegistrationEditContext } from "@/components/form/RegistratonEditContext";
import { Club } from "@/schemas/clubSchema";
import { updateForm } from "@/services/clubFormFieldServices";
import { getAllMembers, importClubMembers } from "@/services/clubServices";
import {
  downloadAsCsv,
  importFile,
  validateExtendedFieldInputs,
} from "@/util/csvClientUtils";
import { importCsvFile } from "@/util/csvUtils";
import {
  toastError,
  toastLoading,
  toastSuccess,
  tryOrToast,
} from "@/util/toastUtils";
import { useRouter } from "next/navigation";
import { BackButton, BlueButton, YellowButton } from "../misc/buttons";
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

export function PreviewFormButton({ className }: { className?: string }) {
  const { showPreview, setShowPreview, extendedFields } =
    useRegistrationEditContext();

  async function togglePreview() {
    tryOrToast(() => {
      if (!showPreview) {
        validateExtendedFieldInputs(extendedFields);
      }
      setShowPreview(!showPreview);
    });
  }

  return (
    <YellowButton onClick={togglePreview} className={`w-[24rem] ${className}`}>
      {showPreview ? "Edit" : "Preview"}
    </YellowButton>
  );
}

export function SaveFormButton({
  clubId,
  className,
}: {
  clubId: number;
  className?: string;
}) {
  const { extendedFields } = useRegistrationEditContext();

  async function save() {
    toastLoading();
    tryOrToast(async () => {
      await updateForm(extendedFields, clubId);
      toastSuccess("Form saved successfully");
    });
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
