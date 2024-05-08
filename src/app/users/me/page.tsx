"use server";

import ProfileEditForm from "@/components/form/profile-edit-form";
import { PageHeader } from "@/components/misc/PageHeader";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { AppUser } from "@/schemas/authSchema";
import { auth } from "@/util/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/"); // redirect back to home page if user is not authenticated
  }
  return (
    <div
      className="flex justify-center bg-cover"
      style={{ backgroundImage: "url('/cow-pattern-background.svg')" }}
    >
      <main className="h-[calc(100vh-4rem)] px-16 py-8">
        <PageHeader
          title="My Profile"
          subtitle="Which clubs can see this data?"
          href="/users/me/clubs"
        />

        <ProfileEditForm />
      </main>
    </div>
  );
}
