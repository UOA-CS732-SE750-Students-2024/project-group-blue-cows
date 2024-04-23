export default function AdminPage({ params }: { params: { clubId: string } }) {
  return (
    <main>
      <h1>Admin For Club ID: {params.clubId}</h1>
    </main>
  );
}
