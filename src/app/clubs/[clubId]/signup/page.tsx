"use client"; // to get react to know it's a client compponent

import React, { useState } from "react";

import FormWrapper from "@/components/form/form-wrapper";
import ClubMembershipForm from "@/components/form/ClubMembershipForm";
import { Button } from "@/components/ui/button";
import { Club } from "@/schemas/clubSchema";

export default function Page() {
  const [clubData, setClubData] = useState<Club | null>(null);
  const logo = clubData?.logo || "";
  return (
    <section className="w-full">
      <div className="h-screen justify-center w-full pt-20 ">
        <Button>
          <p> Return to Club Page </p>
        </Button>
        <img src={logo} alt="club logo" className="w-10 h-10" />
        <FormWrapper label="Membership Form" title="">
          <ClubMembershipForm />
        </FormWrapper>
      </div>
    </section>
  );
}
