"use client";
import "client-only";
import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { useRegistrationEditContext } from "./RegistratonEditContext";

export default function Preview({
  previewComponent,
  children,
}: {
  previewComponent: ReactNode;
  children: ReactNode;
}) {
  const { showPreview } = useRegistrationEditContext();

  return showPreview ? (
    <Card className="w-full bg-customLight">
      <CardContent className="py-6">{previewComponent}</CardContent>
    </Card>
  ) : (
    children
  );
}
