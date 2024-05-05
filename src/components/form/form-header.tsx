import { Club } from "@/schemas/clubSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthHeaderProps {
  label: string;
  title: string;
}

export const FormHeader = ({ label, title }: AuthHeaderProps) => {
  const [clubData, setClubData] = useState<Club | null>(null);
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-semibold">
        {title} {clubData?.name || "[CLUB NAME]"}{" "}
        {/* Remove placeholder text when club is connected */}
      </h1>
      <p className=" text-xl text-muted-foreground">{label}</p>
    </div>
  );
};
