"use client"; // to get react to know it's a client compponent

import React from "react";
import ClubRegistrationForm from "@/components/form/club-registration-form";
import FormWrapper from "@/components/form/form-wrapper";

export default function Page() {
  return (
    <section className="w-full">
      <div className="h-auto justify-center w-full p-14 bg-customGrass">
        <FormWrapper label="Registration Form" title="Register a Club">
          <ClubRegistrationForm />
        </FormWrapper>
      </div>
    </section>
  );
}
