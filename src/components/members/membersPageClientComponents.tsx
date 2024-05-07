"use client";
import { useRouter } from "next/navigation";
import { BackButton, BlueButton, YellowButton } from "../misc/buttons";
import { Club } from "@/schemas/clubSchema";
import { useRegistrationEditContext } from "@/app/clubs/[clubId]/admin/registration/RegistratonEditContext";
import { postClub } from "@/services/clubServices";
import { toastError, toastSuccess } from "@/util/toastUtils";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";
import { postExtendedFormField } from "@/gateway/postExtendedFormField";

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

export function PreviewFormButton({
  className,
  club,
}: {
  className?: string;
  club: Club;
}) {
  function preview() {
    console.log("Preview Clicked");
  }

  return (
    <YellowButton onClick={preview} className={`w-[24rem] ${className}`}>
      Preview
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
