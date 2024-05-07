"use server";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ReturnButton from "@/components/profile/ReturnButton";
import ProfileEditForm from "@/components/form/profile-edit-form";

export default async function ProfilePage() {
  return (
    <main className="h-[calc(100vh-4rem)] px-16 py-8">
      <div className="w-full">
        <ReturnButton />
      </div>
      <div className="mt-2">
        <ProfileHeader />
      </div>
      <div className="my-2">
        <ProfileEditForm />
      </div>
    </main>
  );
}
