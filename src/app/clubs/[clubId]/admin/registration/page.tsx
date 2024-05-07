import EditClubRegistrationForm from "@/components/form/club-edit-registration";
import {
  MembersPageBack,
  PreviewFormButton,
  SaveFormButton,
} from "@/components/members/membersPageClientComponents";
import { Card, CardContent } from "@/components/ui/card";
import { Club } from "@/schemas/clubSchema";
import { getClubById } from "@/services/clubServices";
import { getAllExtendedFields } from "@/services/optionsFormServices";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RegistrationEditProvider } from "./RegistratonEditContext";

export default async function RegistrationEditPage({
  params: { clubId },
}: {
  params: { clubId: string };
}) {
  const club = await getClubById(+clubId);
  if (!club) return notFound();
  const extendedFields = await getAllExtendedFields(+clubId);

  return (
    <div className="h-[calc(100vh-4rem)] w-full p-10">
      <RegistrationEditProvider initialExtendedFields={extendedFields}>
        <div className="flex justify-between mb-6">
          <MembersPageBack clubId={clubId} className="shrink-0" />
          <PageHeader
            club={club}
            className="flex-auto mx-2 lg:mx-8 shrink-0 mt-2"
          />
          <PreviewFormButton club={club} className="ml-6 lg:ml-0" />
          <SaveFormButton className="ml-2 md:ml-6 xl:ml-12" />
        </div>
        <PageInfo />
        <EditClubRegistrationForm
          clubId={+clubId}
          initialExtendedFields={extendedFields}
        />
      </RegistrationEditProvider>
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

function PageInfo() {
  return (
    <Card className="w-full bg-[#FFD166] mb-4">
      <CardContent className="py-6">
        Cowlaboration will automatically collect default information about a
        member, including their full name, email, UPI, student ID, University,
        year level, degree, and specialisation/majors. If you would like to
        collect additional information about your club members, you may add
        custom fields to your club&apos;s registration form here.
      </CardContent>
    </Card>
  );
}
