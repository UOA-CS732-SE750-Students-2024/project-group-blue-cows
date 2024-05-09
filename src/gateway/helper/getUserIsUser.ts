import { getUserAuthentication } from "@/util/auth";

export async function getUserisUser(userId: string) {
  const currentUser = await getUserAuthentication();
  if (!currentUser.id) throw new Error("user has no Id");
  if (currentUser.id !== userId)
    throw new Error("current user is not inputted user");
}
