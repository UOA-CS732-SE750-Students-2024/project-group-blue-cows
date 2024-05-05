import { Club } from "@/schemas/clubSchema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { URLSearchParams } from "url";
import { getClubById } from "@/services/clubServices";
import LoadingSpinner from "../ui/loading-spinner";
interface AuthHeaderProps {
  label: string;
  title: string | null;
  params: { clubId: string }; // New prop
  formType: "registration" | "membership"; // New prop
}

export const FormHeader = ({
  label,
  title,
  params,
  formType,
}: AuthHeaderProps) => {
  const [clubData, setClubData] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const clubData = await getClubById(Number(params.clubId));
      setClubData(clubData);
      setLoading(false);
    };
    getData();
  }, []);

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
