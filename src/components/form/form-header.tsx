import { Club } from "@/schemas/clubSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { URLSearchParams } from "url";
interface AuthHeaderProps {
  label: string;
  title: string | null;
  formType: "registration" | "membership"; // New prop
}

export const FormHeader = ({ label, title, formType }: AuthHeaderProps) => {
  const [clubData, setClubData] = useState<Club | null>(null);
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {formType === "registration" ? (
        <h1 className="text-3xl font-semibold">{title}</h1>
      ) : formType === "membership" ? (
        <h1 className="text-3xl font-semibold">
          {clubData?.name || "[CLUB NAME]"}
        </h1>
      ) : null}
      <p className=" text-xl text-muted-foreground">{label}</p>
    </div>
  );
};
