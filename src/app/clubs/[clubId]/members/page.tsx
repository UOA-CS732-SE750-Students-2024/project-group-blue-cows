import MembersTable from "@/components/members/MembersTable";
import {
  DeleteButton,
  ExportButton,
  ImportButton,
  MembersPageBack,
} from "@/components/members/membersPageClientComponents";
import { Club } from "@/schemas/clubSchema";
import { getAllMembers, getClubById } from "@/services/clubServices";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MemberPageContextProvider } from "../../../../components/members/MemberPageContext";

export default async function MembersPage({
  params: { clubId },
}: {
  params: { clubId: string };
}) {
  if (isNaN(+clubId)) {
    return notFound();
  }
  const { finalHeaders, membersFullData } = await getAllMembers(+clubId);
  const club = await getClubById(+clubId);
  if (!club) {
    return notFound();
  }

  // console.log(finalHeaders)

  return (
    <div className="flex flex-col h-full p-4 lg:py-12 lg:px-16">
      <MemberPageContextProvider initialMembers={membersFullData}>
        <div className="flex justify-between mb-6">
          <MembersPageBack clubId={clubId} className="shrink-0" />
          <PageHeader
            club={club}
            className="flex-auto mx-2 lg:mx-8 shrink-0 mt-2"
          />
          <ImportButton club={club} className="ml-6 lg:ml-0" />
          <ExportButton club={club} className="ml-2 md:ml-6 xl:ml-12" />
          <DeleteButton club={club} className="ml-2 md:ml-6 xl:ml-12" />
        </div>
        <MembersTable headers={finalHeaders} />
      </MemberPageContextProvider>
    </div>
  );
}

function PageHeader({ club, className }: { club: Club; className?: string }) {
  return (
    <div className={`${className}`}>
      <h2 className="text-lg lg:text-[length:calc(0.5rem+1.5vw)] font-extrabold leading-4 pb-[0.4em]">
        Registered Members
      </h2>
      <Link
        href={`/clubs/${club.id}`}
        className="italic hover:underline text-sm lg:text-md"
      >
        {club.name}
      </Link>
    </div>
  );
}
