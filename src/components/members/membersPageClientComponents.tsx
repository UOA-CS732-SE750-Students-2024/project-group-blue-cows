"use client";
import { useRouter } from "next/navigation";
import { BackButton, BlueButton, YellowButton } from "../misc/buttons";
import { Club } from "@/schemas/clubSchema";

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

export function SaveFormButton({
  className,
  club,
}: {
  className?: string;
  club: Club;
}) {
  function save() {
    console.log("Saved");
  }

  return (
    <BlueButton onClick={save} className={`w-[24rem] ${className}`}>
      Save
    </BlueButton>
  );
}
