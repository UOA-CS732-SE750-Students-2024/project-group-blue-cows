import { redirect } from "next/navigation";

export default function UserPage({ params }: { params: { userId: string } }) {
  if (params.userId === 'authcontext.user.idOrSmth') {
    redirect('/users/me');
  }

  return (
    <main>
      <h1>User ID: {params.userId}</h1>
    </main>
  );
}
