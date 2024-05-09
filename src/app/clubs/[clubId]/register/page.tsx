import ClubMembershipForm from "@/components/form/ClubMembershipForm";
import FormWrapper from "@/components/form/form-wrapper";
import { Button } from "@/components/ui/button";
import { getAllExtendedFields } from "@/services/clubFormFieldServices";
import { getClubById } from "@/services/clubServices";

export default async function Page({
  params: { clubId },
}: {
  params: { clubId: string };
}) {
  const club = await getClubById(+clubId);
  const extendedFields = await getAllExtendedFields(+clubId);

  if (!club) return null;

  const clubData = await getClubById(Number(+clubId));

  const logo = clubData?.logo || "";
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
            clubFormFields={extendedFields}
          />
        </FormWrapper>
      </div>
    </section>
  );
}
