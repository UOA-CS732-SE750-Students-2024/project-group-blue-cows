"use client";
import { membersColumns } from "@/components/ui/columns";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { MembersTable } from "@/components/ui/members-table";
import { studentData } from "@/gateway/getAllMembersForClub";
import { Club } from "@/schemas/clubSchema";
import { getAllMembers, getClubById } from "@/services/clubServices";
import { useEffect, useState } from "react";
import Custom404 from "@/pages/404";

export default function AdminPage({ params }: { params: { clubId: string } }) {
  const [membersData, setMembersData] = useState<studentData[]>([]);
  const [clubData, setClubData] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const membersData = await getAllMembers(Number(params.clubId));
      console.log(membersData);
      const clubData = await getClubById(Number(params.clubId));
      if (!clubData) {
        setNotFound(true);
        return;
      }
      setMembersData(membersData);
      setClubData(clubData);
      setLoading(false);
    };
    getData();
  }, []);

  if (notFound) {
    return <Custom404 />;
  }

  return (
    <div className="flex h-screen overflow-auto">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex justify-center items-center w-screen px-10">
          <MembersTable
            columns={membersColumns}
            membersData={membersData}
            clubData={clubData}
          />
        </div>
      )}
    </div>
  );
}
