"use client";
import { GetExtendedFormFieldDto } from "@/Dtos/GetExtendedFormFieldDto";
import "client-only";
import { ReactNode, createContext, useContext, useState } from "react";

const RegistratonEditContext = createContext<{
  extendedFields: GetExtendedFormFieldDto[];
  setExtendedFields: (extendedFields: GetExtendedFormFieldDto[]) => void;
}>({ extendedFields: [], setExtendedFields() {} });

export function RegistrationEditProvider({
  children,
  initialExtendedFields,
}: {
  children: ReactNode;
  initialExtendedFields: GetExtendedFormFieldDto[];
}) {
  const [extendedFields, setExtendedFields] = useState(initialExtendedFields);

  return (
    <RegistratonEditContext.Provider
      value={{ extendedFields, setExtendedFields }}
    >
      {children}
    </RegistratonEditContext.Provider>
  );
}

export function useRegistrationEditContext() {
  return useContext(RegistratonEditContext);
}
