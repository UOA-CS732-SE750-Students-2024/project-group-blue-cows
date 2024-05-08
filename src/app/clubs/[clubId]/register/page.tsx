import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FormWrapper from "@/components/form/form-wrapper";
import ClubMembershipForm from "@/components/form/ClubMembershipForm";
import { Button } from "@/components/ui/button";
import { Club } from "@/schemas/clubSchema";
import { getClubById } from "@/services/clubServices";
import router, { useRouter } from "next/navigation";
import { getClubFormFields } from "@/gateway/clubFormField/getClubFormFields";

export default async function Page({
  params: { clubId },
}: {
  params: { clubId: string };
}) {
  const club = await getClubById(+clubId);
  const clubFormFields = await getClubFormFields(+clubId);

  if (!club) return null;

  const clubData = await getClubById(Number(+clubId));

  const logo = clubData?.logo || "";
  return (
    <section className="w-full">
      <div className="h-screen justify-center w-full pt-20 ">
        <div className="flex flex-row space-x-4  justify-center py-2">
          <a href={`/clubs/${clubId}/view`}>
            <Button variant="destructive" className="min-w-max">
              <p> Return to Club Page </p>
            </Button>
          </a>
          <img src={logo} alt="club logo" className="w-10 h-10" />
        </div>
        <FormWrapper
          label="Membership Form"
          title=""
          formType="membership"
          params={{ clubId: clubId }}
        >
          <ClubMembershipForm
            clubId={clubId}
            club={club}
            clubFormFields={clubFormFields}
          />
        </FormWrapper>
      </div>
    </section>
  );
}
