"use client";

import { Club } from "@/schemas/clubSchema";
import { BackButton, BlueButton, YellowButton } from "../misc/buttons";
import { useRouter } from "next/navigation";
import { useAdmin } from "./AdminPageContext";
import { Textarea, TextareaProps } from "../ui/textarea";
import { UpdateClubDto } from "@/Dtos/club/UpdateClubDto";
import { updateClub } from "@/services/clubServices";
import { LegacyRef, useRef } from "react";

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

// export function EditDescriptionComponent({
//   clubData,
//   className,
// }: {
//   clubData: Club;
//   className?: string;
// }) {
//   const { setClub } = useAdmin();
//   const descriptionRef = useRef<TextareaProps>(null);

//   const handleSaveDescription = async () => {
//     const updatedDescription = descriptionRef.current?.value as string; // Accessing the current textarea value
//     if (updatedDescription !== undefined) {
//       const updatedClub: UpdateClubDto = {
//         ...clubData,
//         description: updatedDescription
//       };

//       // Calling the updateClub function to update the backend
//       const result = await updateClub(clubData.id, updatedClub);
//       if (result === "Failed to update club into database") {
//         alert("Failed to update description");
//       } else {
//         setClub(updatedClub); // Update the context with the new description
//         alert("Description updated successfully!");
//       }
//     }
//   };

//   return (
//     <div className={`flex flex-col ${className}`}>
//       <Textarea
//         ref={descriptionRef as LegacyRef<TextareaProps>}
//         defaultValue={clubData.description}
//         className="resize-none p-2"
//       />
//       <BlueButton
//         className="mt-2"
//         onClick={handleSaveDescription}
//       >
//         Save Description
//       </BlueButton>
//     </div>
//   );
// }
