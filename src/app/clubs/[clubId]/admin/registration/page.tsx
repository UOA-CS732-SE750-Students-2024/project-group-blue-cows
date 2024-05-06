"use client";
import EditClubRegistrationForm from "@/components/form/club-edit-registration";

export default function AdminEditPage({
  params,
}: {
  params: { clubId: string };
}) {
  console.log(params);

  return (
    <div className="h-[calc(100vh-4rem)] w-full p-10">
      <EditClubRegistrationForm />
    </div>
  );
}
