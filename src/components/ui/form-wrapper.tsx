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
}

const FormWrapper = ({ label, title, children }: FormWrapperProps) => {
  return (
    <Card className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 max-w-4xl mx-auto shadow-md">
      <CardHeader>
        <FormHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormWrapper;
