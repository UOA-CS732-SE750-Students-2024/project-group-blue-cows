import ClubMembershipForm from "@/components/form/ClubMembershipForm";
import FormWrapper from "@/components/form/form-wrapper";
import { Button } from "@/components/ui/button";
import { AppUser } from "@/schemas/authSchema";
import { getAllExtendedFields } from "@/services/clubFormFieldServices";
import { getClubById } from "@/services/clubServices";
import { getFieldInputForUser } from "@/services/formFieldInputServices";
import { getUserAuthentication } from "@/util/auth";

export default async function Page({
  params: { clubId },
}: {
  params: { clubId: string };
}) {
  const club = await getClubById(+clubId);
  const user = (await getUserAuthentication()) as AppUser;
  const extendedFields = await getAllExtendedFields(+clubId);
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

  if (!club) return null;

  const clubData = await getClubById(Number(+clubId));

  const logo = clubData?.logo || "";
  return (
    <section className="w-full">
      <div className="min-h-screen justify-center w-full pt-20 ">
        <div className="flex flex-row space-x-4  justify-center py-2">
          <a href={`/clubs/${clubId}/view`}>
            <Button variant="destructive" className="min-w-max">
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
