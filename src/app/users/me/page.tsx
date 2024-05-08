import ProfileEditForm from "@/components/form/profile-edit-form";
import { PageHeader } from "@/components/misc/PageHeader";
import ProfileHeader from "@/components/profile/ProfileHeader";

export default async function ProfilePage() {
  return (
    <main className="h-[calc(100vh-4rem)] px-16 py-8">
      <PageHeader
        title="Edit Profile"
        subtitle="Which clubs can see this data?"
        href="/users/me/clubs"
      />
      <div className="mt-2">
        <ProfileHeader />
      </div>
      <div className="my-2">
        <ProfileEditForm />
      </div>
    </main>
  );
}
