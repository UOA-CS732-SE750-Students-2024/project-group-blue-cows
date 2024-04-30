import { auth, signIn } from "@/util/auth";
import { SignOut } from "@/components/ui/sign-out";

export default async function ProfilePage() {
  // This is how you get the user's session within a server component
  const session = await auth();

  if (!session?.user) {
    return signIn("Google");
  }

  return (
    <main className="h-screen grid justify-center content-center">
      <h1>Profile Page</h1>
      <p>{session?.user ? "You are signed in" : "You are not signed in"}</p>
      <p>Name: {session?.user?.name || "Undefined"}</p>
      <p>Email: {session?.user?.email || "Undefined"}</p>
      <SignOut></SignOut>
    </main>
  );
}
