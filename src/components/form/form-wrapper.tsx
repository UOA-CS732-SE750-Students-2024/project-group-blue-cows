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
  params: { clubId: string };
}

const FormWrapper = ({
  label,
  title,
  children,
  formType,
  params,
}: FormWrapperProps) => {
  return (
    <Card className="w-full max-w-5xl mx-auto shadow-md overflow-y-auto">
      <CardHeader>
        <FormHeader
          label={label}
          title={title}
          formType={formType}
          params={params}
        />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormWrapper;
