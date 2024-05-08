import { combineMembersData, extractFieldNames } from "@/util/memberUtil";
import { getInputsForClub } from "../formFieldInput/getInputsForClub";
import { getAllMembersForClub } from "./getAllMembersForClub";

export async function getMembersAllDataForClub(clubId: number) {
  const { headers, membersData } = await getAllMembersForClub(clubId);
  const additionalMembersData = await getInputsForClub(clubId);
  const result = combineMembersData(membersData, additionalMembersData);
  const additionalHeaders = extractFieldNames(additionalMembersData);
  const finalHeaders = headers.concat(additionalHeaders);
}
