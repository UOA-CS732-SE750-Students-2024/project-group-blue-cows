import { combineMembersData } from "@/util/memberUtil";
import { getInputsForClub } from "../formFieldInput/getInputsForClub";
import { getAllMembersForClub } from "./getAllMembersForClub";

export async function getMembersAllDataForClub(clubId: number) {
  const { headers, membersData } = await getAllMembersForClub(clubId);
  const results = await getInputsForClub(clubId);
  const result = combineMembersData();
}
