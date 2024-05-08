import { Club } from "@/schemas/clubSchema";
import { useEffect, useState } from "react";
import { URLSearchParams } from "url";
import { getClubById } from "@/services/clubServices";
import LoadingSpinner from "../ui/loading-spinner";
import { useRouter, useSearchParams } from "next/navigation";

interface AuthHeaderProps {
  label: string;
  title: string | null;
  formType: "registration" | "membership"; // New prop
  clubId?: string;
}

export const FormHeader = ({
  label,
  title,
  formType,
  clubId,
}: AuthHeaderProps) => {
  const [clubData, setClubData] = useState<Club | null>(null);
  const [loading, setLoading] = useState(
    formType === "registration" ? false : true
  );

  useEffect(() => {
    const getData = async () => {
      if (formType === "membership" && clubId) {
        const clubData = await getClubById(Number(clubId));
        setClubData(clubData);
        setLoading(false);
      }
    };
    getData();
  }, [formType, clubId]);

  if (loading) {
    return <LoadingSpinner />;
  }

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
