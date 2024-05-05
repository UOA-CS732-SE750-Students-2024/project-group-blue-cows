"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { FormHeader } from "./form-header";

interface FormWrapperProps {
  label: string;
  title: string;
  children: React.ReactNode;
  formType: "registration" | "membership";
}

const FormWrapper = ({
  label,
  title,
  children,
  formType,
}: FormWrapperProps) => {
  return (
    <Card className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-3/4 max-w-4xl mx-auto shadow-md overflow-y-auto">
      <CardHeader>
        <FormHeader label={label} title={title} formType={formType} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormWrapper;
