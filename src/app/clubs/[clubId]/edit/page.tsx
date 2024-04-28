export default function AdminEditPage({
  params,
}: {
  params: { clubId: string };
}) {
  return (
    <main>
      <h1>Admin Editing Club ID: {params.clubId}</h1>
    </main>
  );
}
