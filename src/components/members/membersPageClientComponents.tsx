"use client";
import { useRouter } from "next/navigation";
import { BackButton, BlueButton, YellowButton } from "../misc/buttons";
import { Club } from "@/schemas/clubSchema";
import { useRegistrationEditContext } from "@/components/form/RegistratonEditContext";
import { postClub } from "@/services/clubServices";
import { toastError, toastSuccess } from "@/util/toastUtils";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";
import { postExtendedFormField } from "@/gateway/extendedFormField/postExtendedFormField";

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
