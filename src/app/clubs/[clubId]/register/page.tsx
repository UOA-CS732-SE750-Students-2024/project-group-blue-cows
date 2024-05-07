"use client"; // to get react to know it's a client compponent

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FormWrapper from "@/components/form/form-wrapper";
import ClubMembershipForm from "@/components/form/ClubMembershipForm";
import { Button } from "@/components/ui/button";
import { Club } from "@/schemas/clubSchema";
import { getClubById } from "@/services/clubServices";

export default function Page() {
  const [clubData, setClubData] = useState<Club | null>(null);
  const params = useParams<{ clubId: string }>();

  useEffect(() => {
    const getData = async () => {
      const clubData = await getClubById(Number(params.clubId));
      setClubData(clubData);
    };
    getData();
  }, []);

  const logo = clubData?.logo || "";
  return (
    <section className="w-full">
      <div className="h-screen justify-center w-full pt-20 ">
        <div className="flex flex-row space-x-4  justify-center py-2">
          <Button variant="destructive" className="min-w-max">
            <p> Return to Club Page </p>
          </Button>
          <img src={logo} alt="club logo" className="w-10 h-10" />
        </div>
        <FormWrapper
          label="Membership Form"
          title=""
          formType="membership"
          params={{ ...params }}
        >
          <ClubMembershipForm params={{ ...params }} />
        </FormWrapper>
      </div>
    </section>
  );
}
