import { getUserAuthentication } from "@/util/auth";
import { getMemberForClub } from "../member/getMemberForClub";

export async function getUserAuthenticationAdmin(clubId: number) {
  const currentUser = await getUserAuthentication();
  if (!currentUser.id) throw new Error("user has no Id");
  const memberStatus = (await getMemberForClub(currentUser.id, clubId))
    ?.isAdmin;
  if (!memberStatus) throw new Error("member not admin");
}
