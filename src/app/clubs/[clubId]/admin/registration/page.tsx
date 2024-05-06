import { GetExtendedFormFieldDto } from "@/Dtos/GetExtendedFormFieldDto";
import EditClubRegistrationForm from "@/components/form/club-edit-registration";
import {
  MembersPageBack,
  PreviewFormButton,
  SaveFormButton,
} from "@/components/members/membersPageClientComponents";
import { Club } from "@/schemas/clubSchema";
import { getClubById } from "@/services/clubServices";
import { getAllExtendedFields } from "@/services/optionsFormServices";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AdminEditPage({
  params: { clubId },
}: {
  params: { clubId: string };
}) {
  const club = await getClubById(+clubId);
  if (!club) return notFound();
  const extendedFields = await getAllExtendedFields(+clubId);

  return (
    <div className="h-[calc(100vh-4rem)] w-full p-10">
      <div className="flex justify-between mb-6">
        <MembersPageBack clubId={clubId} className="shrink-0" />
        <PageHeader
          club={club}
          className="flex-auto mx-2 lg:mx-8 shrink-0 mt-2"
        />
        <PreviewFormButton club={club} className="ml-6 lg:ml-0" />
        <SaveFormButton club={club} className="ml-2 md:ml-6 xl:ml-12" />
      </div>
      <EditClubRegistrationForm
        clubId={+clubId}
        initialExtendedFields={extendedFields}
      />
    </div>
  );
}

function PageHeader({ club, className }: { club: Club; className?: string }) {
  return (
    <div className={`${className}`}>
      <h2 className="text-lg lg:text-[length:calc(0.5rem+1.5vw)] font-extrabold leading-4 pb-[0.4em]">
        Edit Registration Form
      </h2>
      <Link
        href={`http://localhost:3000/clubs/${club.id}`}
        className="italic hover:underline text-sm lg:text-md"
      >
        {club.name}
      </Link>
    </div>
  );
}
