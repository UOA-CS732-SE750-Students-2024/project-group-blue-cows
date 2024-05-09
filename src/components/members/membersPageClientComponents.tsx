"use client";
import { useRegistrationEditContext } from "@/components/form/RegistratonEditContext";
import { Club } from "@/schemas/clubSchema";
import { updateForm } from "@/services/clubFormFieldServices";
import {
  getAllMembers,
  importClubMembers,
  removeAllMembers,
} from "@/services/clubServices";
import {
  downloadAsCsv,
  importFile,
  validateExtendedFieldInputs,
} from "@/util/csvClientUtils";
import { importCsvFile } from "@/util/csvUtils";
import { confirm } from "@/util/modalUtils";
import {
  toastError,
  toastLoading,
  toastSuccess,
  tryOrToast,
} from "@/util/toastUtils";
import { useSession } from "next-auth/react";
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
      Import<span className="hidden xl:inline whitespace-pre"> Data</span>
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
      const { finalHeaders, membersFullData } = await getAllMembers(club.id);
      downloadAsCsv(
        finalHeaders,
        membersFullData,
        `${club.name}_membership.csv`
      );
    } catch (error) {
      toastError("Error exporting CSV");
    }
  }

  return (
    <YellowButton onClick={exportMembers} className={`w-[24rem] ${className}`}>
      Export<span className="hidden xl:inline whitespace-pre"> Data</span>
    </YellowButton>
  );
}

export function DeleteButton({
  club,
  className,
}: {
  club: Club;
  className?: string;
}) {
  const { members, setMembers } = useMemberPage();
  const user = useSession().data?.user;

  async function confirmDelete() {
    return confirm({
      title: "Delete All Members?",
      content: (
        <div className="text-[1rem] leading-6 py-4 px-2">
          <p className="mb-2">
            All members and admins except yourself will be deleted.
          </p>
          <p>
            This action is irreversible. Are you sure you want to delete
            everyone?
          </p>
        </div>
      ),
      className: "w-[32rem] h-[18rem]",
    });
  }

  async function handleDeleteMembers() {
    if (await confirmDelete()) {
      toastLoading();
      try {
        const { finalHeaders, membersFullData } = await getAllMembers(club.id);
        // Automatic backup because scary
        downloadAsCsv(
          finalHeaders,
          membersFullData,
          `${club.name}_membership.csv`
        );
        if (!user) throw new Error("You are not logged in.");
        const you = members.find((m) => m.email === user.email);
        if (!you) throw new Error("You are not a member of this club.");
        const membersRemaining = await removeAllMembers(club.id);
        setMembers(membersRemaining); // Keep yourself
        toastSuccess("All members deleted. Automatically exported backup.");
      } catch (error) {
        console.log(error);
        toastError("Error deleting members");
      }
    }
  }

  return (
    <YellowButton
      onClick={handleDeleteMembers}
      className={`w-[24rem] bg-red-400 hover:bg-red-500 ${className}`}
    >
      Delete<span className="hidden xl:inline whitespace-pre"> Data</span>
    </YellowButton>
  );
}
