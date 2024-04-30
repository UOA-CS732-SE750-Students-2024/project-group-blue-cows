import { auth, signIn } from "@/util/auth";
import { SignOut } from "@/components/ui/sign-out";
import ProfileHeader from "./components/ProfileHeader";
import { Button } from "@/components/ui/button";
import ProfileEditBody from "./components/ProfileEditBody";
import { AuthContextProvider } from "@/components/contexts/AuthContext";

export default async function ProfilePage() {
  // This is how you get the user's session within a server component
  const session = await auth();

  if (!session?.user) {
    return signIn("Google");
  }

  return (
    <AuthContextProvider>
      <main className="h-[calc(100vh-4rem)]">
        <div className="w-full">
          <Button variant="default">Return</Button>
        </div>

        <div className="mt-2">
          <ProfileHeader />
        </div>

        <div>
          <ProfileEditBody />
        </div>
        <h1>Profile Page</h1>
        <p>{session?.user ? "You are signed in" : "You are not signed in"}</p>
        <p>Name: {session?.user?.name || "Undefined"}</p>
        <p>Email: {session?.user?.email || "Undefined"}</p>
      </main>
    </AuthContextProvider>
  );
}
