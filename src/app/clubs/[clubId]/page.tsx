import { redirect } from "next/navigation";

// Route changed, redirect
export default function ClubPage({ params }: { params: { clubId: string } }) {
  redirect(`/clubs/${params.clubId}/admin`);

  return (
    <main>
      <h1>Club ID: {params.clubId}</h1>
    </main>
  );
}
