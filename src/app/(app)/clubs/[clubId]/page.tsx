export default function ClubPage({ params }: { params: { clubId: string } }) {
  return (
    <main>
      <h1>Club ID: {params.clubId}</h1>
    </main>
  );
}
