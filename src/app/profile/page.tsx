import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileEditBody from "@/components/profile/EditProfileBody";
import ReturnButton from "@/components/profile/ReturnButton";
import SubmitButton from "@/components/profile/SubmitButton";

export default async function ProfilePage() {
  return (
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
  );
}
