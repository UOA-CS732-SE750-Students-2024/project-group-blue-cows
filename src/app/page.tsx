import { auth } from "@/util/auth";
import { redirect } from "next/navigation";

// Testing page is now at /test
export default async function RootPage() {
  const session = await auth();
  redirect(session ? "/users/me/clubs" : "/clubs");
}
