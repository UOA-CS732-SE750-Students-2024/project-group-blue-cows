import EditClubRegistrationForm from "@/components/form/club-edit-registration";
import { getAllExtendedFields } from "@/services/optionsFormServices";

export default async function AdminEditPage({
  params: { clubId },
}: {
  params: { clubId: string };
}) {
  const extendedFields = await getAllExtendedFields(+clubId);
  console.log(extendedFields);

  return (
    <div className="h-[calc(100vh-4rem)] w-full p-10">
      <EditClubRegistrationForm />
    </div>
  );
}
