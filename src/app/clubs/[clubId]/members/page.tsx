import { membersColumns } from "@/components/ui/columns";
import MembersPage from "@/components/ui/members-table";
import { getAllMembers, getClubById } from "@/services/clubServices";
import { notFound } from "next/navigation";

export default async function AdminPage({
  params,
}: {
  params: { clubId: string };
}) {
  if (isNaN(Number(params.clubId))) {
    return notFound();
  }
  const membersData = await getAllMembers(Number(params.clubId));
  const clubData = await getClubById(Number(params.clubId));
  if (!clubData || !membersData) {
    return notFound();
  }

  return (
    <div className="flex h-screen justify-center items-center w-screen px-10">
      <MembersPage
        columns={membersColumns}
        membersData={membersData}
        clubData={clubData}
      />
    </div>
  );
}
