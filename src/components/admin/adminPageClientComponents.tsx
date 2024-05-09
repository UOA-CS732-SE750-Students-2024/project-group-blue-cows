"use client";

import { Club } from "@/schemas/clubSchema";
import { BackButton, BlueButton, YellowButton } from "../misc/buttons";
import { useRouter } from "next/navigation";
import { useAdmin } from "./AdminPageContext";




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

  export function EditClubInformation({
    clubData,
    className,
  }: {
    clubData: Club;
    className?: string;
  }) {
    const router = useRouter();
    return (
      <YellowButton
      className={`${className}`}
      onClick={() => router.push(`/clubs/${clubData.id}/view`)}
    >
        View Club Information
        </YellowButton>
    );
  }

  export function EditRegistrationFormButton({
    clubData,
    className,
  }: {
    clubData: Club;
    className?: string;
  }) {
    const router = useRouter();
    return (
      <YellowButton
      className={`${className}`}
      onClick={() => router.push(`/clubs/${clubData.id}/register/edit`)}
    >
        Edit Registration Form
        </YellowButton>
    );
  }

  export function ViewMembersButton({
    clubData,
    className,
  }: {
    clubData: Club;
    className?: string;
  }) {
    const router = useRouter();
    return (
      <YellowButton
      className={`${className}`}
      onClick={() => router.push(`/clubs/${clubData.id}/members`)}
    >
        View Members
        </YellowButton>
    );
  }

  export function AddNewExecButton({
    clubData,
    className,
  }: {
    clubData: Club;
    className?: string;
  }) {
    const router = useRouter();
    return (
      <YellowButton
      className={`${className}`}
      onClick={() => router.push(`/clubs/${clubData.id}/members`)}
    >
        Add New Exec
        </YellowButton>
    );
  }

  

