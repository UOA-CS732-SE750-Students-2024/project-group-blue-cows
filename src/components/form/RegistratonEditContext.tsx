"use client";
import { GetExtendedFormFieldDto } from "@/Dtos/extendedFormField/GetExtendedFormFieldDto";
import "client-only";
import { ReactNode, createContext, useContext, useState } from "react";

const RegistratonEditContext = createContext<{
  extendedFields: GetExtendedFormFieldDto[];
  setExtendedFields: (extendedFields: GetExtendedFormFieldDto[]) => void;
  showPreview: boolean;
  setShowPreview: (showPreview: boolean) => void;
}>({
  extendedFields: [],
  setExtendedFields() {},
  showPreview: false,
  setShowPreview() {},
});

export function RegistrationEditProvider({
  children,
  initialExtendedFields,
}: {
  children: ReactNode;
  initialExtendedFields: GetExtendedFormFieldDto[];
}) {
  const [extendedFields, setExtendedFields] = useState(initialExtendedFields);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <RegistratonEditContext.Provider
      value={{ extendedFields, setExtendedFields, showPreview, setShowPreview }}
    >
      {children}
    </RegistratonEditContext.Provider>
  );
}

export function useRegistrationEditContext() {
  return useContext(RegistratonEditContext);
}
