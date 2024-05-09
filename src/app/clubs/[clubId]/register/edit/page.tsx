import UnauthorisedUserPage from "@/app/unauthorised";
import ClubMembershipForm from "@/components/form/ClubMembershipForm";
import Preview from "@/components/form/Preview";
import { RegistrationEditProvider } from "@/components/form/RegistratonEditContext";
import EditClubRegistrationForm from "@/components/form/club-edit-registration";
import FormWrapper from "@/components/form/form-wrapper";
import {
  MembersPageBack,
  PreviewFormButton,
  SaveFormButton,
} from "@/components/members/membersPageClientComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppUser } from "@/schemas/authSchema";
import { Club } from "@/schemas/clubSchema";
import { getAllExtendedFields } from "@/services/clubFormFieldServices";
import { getClubById } from "@/services/clubServices";
import { getFieldInputForUser } from "@/services/formFieldInputServices";
import { auth, isUserClubAdmin } from "@/util/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RegistrationEditPage({
  params: { clubId },
}: {
  params: { clubId: string };
}) {
  const club = await getClubById(+clubId);
  if (!club) return notFound();
  const extendedFields = await getAllExtendedFields(+clubId);

  const session = await auth();
  const user = session?.user as AppUser;
  const isAdmin = await isUserClubAdmin(user, clubId);
  const formFields = await Promise.all(
    extendedFields.map(async (extendedField) => {
      const input =
        (await getFieldInputForUser(extendedField.name, user.id))?.value ?? "";
      return {
        name: extendedField.name,
        type: extendedField.type,
        description: extendedField.description,
        value: input,
      };
    })
  );

  if (isAdmin === false) {
    return <UnauthorisedUserPage />;
  }
  return (
    <div className="h-[calc(100vh-4rem)] w-full p-10">
      <RegistrationEditProvider initialExtendedFields={extendedFields}>
        <div className="flex justify-between mb-6">
          <MembersPageBack clubId={clubId} className="shrink-0" />
          <PageHeader
            club={club}
            className="flex-auto mx-2 lg:mx-8 shrink-0 mt-2"
          />
          <PreviewFormButton className="ml-6 lg:ml-0" />
          <SaveFormButton clubId={+clubId} className="ml-2 md:ml-6 xl:ml-12" />
        </div>
        <Preview
          previewComponent={
            <PreviewContent club={club} clubId={clubId} user={user} formFields={formFields} />
          }
        >
          <PageInfo />
          <EditClubRegistrationForm />
        </Preview>
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
        Cowmunity will automatically collect default information about a member,
        including their full name, email, UPI, student ID, University, year
        level, degree, and specialisation/majors. If you would like to collect
        additional information about your club members, you may add custom
        fields to your club&apos;s registration form here.
      </CardContent>
    </Card>
  );
}

function PreviewContent({ club, clubId, user, formFields }: { club: Club; clubId: string, user: AppUser, formFields: any[] }) {
  const { logo } = club;

  return (
    <section className="w-full bg-customGrass">
      <div className="min-h-screen justify-center w-full py-10">
        <div className="flex flex-row space-x-4 py-2 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-3/4 max-w-4xl mx-auto shadow-md overflow-y-auto">
          <a href={`/clubs/${clubId}/view`}>
            <Button className="min-w-max">
              <p> Return to Club Page </p>
            </Button>
          </a>
          <img src={logo} alt="club logo" className="w-10 h-10" />
        </div>
        <FormWrapper
          label="Membership Form"
          title=""
          formType="membership"
          params={{ clubId: clubId }}
        >
          <ClubMembershipForm
            clubId={clubId}
            club={club}
            clubFormFields={formFields}
            user={user}
          />
        </FormWrapper>
      </div>
    </section>
  );
}
