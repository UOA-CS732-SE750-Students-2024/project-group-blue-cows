"use client"; // to get react to know it's a client compponent

import React from "react";
import ClubRegistrationForm from "@/components/ui/club-registration-form";
import FormWrapper from "@/components/ui/form-wrapper";

export default function Page() {
  return (
    <section className="w-full">
      <div className="h-screen justify-center w-full pt-20">
        <FormWrapper label="Registration Form" title="Register a Club">
          <ClubRegistrationForm />
        </FormWrapper>
      </div>
    </section>
  );
}
