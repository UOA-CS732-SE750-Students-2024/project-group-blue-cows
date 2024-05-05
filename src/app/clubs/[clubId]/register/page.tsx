export default function SignupPage({ params }: { params: { clubId: string } }) {
  return (
    <main>
      <h1>Signup For Club ID: {params.clubId}</h1>
    </main>
  );
}
