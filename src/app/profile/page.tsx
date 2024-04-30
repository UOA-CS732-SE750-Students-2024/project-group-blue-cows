import { auth, signIn } from "@/util/auth";
import { SignOut } from "@/components/ui/sign-out";
import ProfileHeader from "./components/ProfileHeader";
import { Button } from "@/components/ui/button";
import ProfileEditBody from "./components/ProfileEditBody";
import { AuthContextProvider } from "@/components/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ReturnButton from "@/components/nav/ReturnButton";
import SubmitButton from "@/components/nav/SubmitButton";

export default async function ProfilePage() {
  // This is how you get the user's session within a server component
  const session = await auth();

  if (!session?.user) {
    return signIn("Google");
  }

  return (
    <AuthContextProvider>
      <main className="h-[calc(100vh-4rem)] px-16 py-8">
        <div className="w-full">
          <ReturnButton />
        </div>
        <div className="mt-2">
          <ProfileHeader />
        </div>
        <div>
          <ProfileEditBody />
        </div>
        <div className="mt-4 text-right">
          <SubmitButton />
        </div>
      </main>
    </AuthContextProvider>
  );
}
