"use client";

import { Club } from "@/schemas/clubSchema";
import { BackButton, BlueButton, YellowButton } from "../misc/buttons";
import { useRouter } from "next/navigation";
import { useAdmin } from "./AdminPageContext";
import { Textarea, TextareaProps } from "../ui/textarea";
import { UpdateClubDto } from "@/Dtos/club/UpdateClubDto";
import { updateClub } from "@/services/clubServices";
import { LegacyRef, useRef } from "react";
import { UploadButton } from "@/util/uploadThingUtils";
import { putClub } from "@/gateway/club/putClub";
import { addImageToGallery } from "@/services/imageServices";
import { PostGalleryImageDto } from "@/Dtos/image/PostGalleryImageDto";
import { Card } from "../ui/card";
import { Input } from "../ui/input";




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


  export function GalleryImageUpload ({
    clubData,
    className,
  }: {
    clubData: Club;
    className?: string;
  }) {

    return (
      <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload Completed");

        //Convert url to string
        const galleryUrl = res[0].url.toString();

        //Construct gallery image dto
        const galleryImage: PostGalleryImageDto = {
          title: "",
          imageUrl: galleryUrl,
          clubId: clubData.id
        };

        // form.setValue("logo", logoUrl, { shouldValidate: true });
        addImageToGallery(galleryImage, clubData.id);
        // updateClub(clubData.id, { logo: logoUrl });
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
    )
  }

  export function LogoImageUpload ({
    clubData,
    className,
  }: {
    clubData: Club;
    className?: string;
  }) {

    return (
      <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload Completed");

        //Convert url to string
        const logoUrl = res[0].url.toString();
        console.log(logoUrl);
        updateClub(clubData.id, { logo: logoUrl });
        console.log(clubData);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
    )
  }

  export function CoverImageUpload ({
    clubData,
    className,
  }: {
    clubData: Club;
    className?: string;
  }) {

    return (
      <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload Completed");

        //Convert url to string
        const coverImageUrl = res[0].url.toString();
        updateClub(clubData.id, { coverImage: coverImageUrl });
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
    )
  }

  interface NameProps {
    className?: string;
  }

  export function EditName({ className }: NameProps) {
    const { club, setClub } = useAdmin();
  
    function setName(name : string) {
      const updatedClub = {
        ...club,
        name,
      };
      setClub(updatedClub);
    }
  
    return (
      <Card className={`w-1/2 p-6 ${className}`}>
        <p className="uppercase">Club Name</p>
        <Input
          value={club.name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => {
            console.log("blur");
            updateClub(club.id, club);
          }}
        />
      </Card>
    );
  }



