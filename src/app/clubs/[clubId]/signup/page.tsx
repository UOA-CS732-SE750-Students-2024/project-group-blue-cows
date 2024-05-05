"use client"; // to get react to know it's a client compponent

import React, { useState } from "react";

import FormWrapper from "@/components/form/form-wrapper";
import ClubMembershipForm from "@/components/ui/ClubMembershipForm";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <section className="w-full">
      <div className="h-screen justify-center w-full pt-20 ">
        <Button>
          <p> Return to Club Page </p>
        </Button>
        <FormWrapper label="Membership Form" title="">
          <ClubMembershipForm />
        </FormWrapper>
      </div>
    </section>
  );
}
