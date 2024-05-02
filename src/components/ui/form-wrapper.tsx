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

const FormWrapper = ({
  label,
  title,
  children,
}: FormWrapperProps) => {
  return (
    <Card className="xl:w-1/4 md:w-1/2 shadow-md">
      <CardHeader>
        <FormHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormWrapper;
