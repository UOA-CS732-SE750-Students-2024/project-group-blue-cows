import {
  combineMembersData,
  extractFieldNames,
  mapToObject,
} from "@/util/memberUtil";
import { getInputsForClub } from "../formFieldInput/getInputsForClub";
import { getAllMembersForClub } from "./getAllMembersForClub";

export async function getMembersAllDataForClub(clubId: number) {
  const { headers, membersData } = await getAllMembersForClub(clubId);
  const additionalMembersData = await getInputsForClub(clubId);
  const studentFullDataArray = combineMembersData(
    membersData,
    additionalMembersData
  );
  const membersFullData: any[] = [];
  studentFullDataArray.forEach((studentData) => {
    const mappedData = mapToObject(studentData);
    membersFullData.push(mappedData);
  });
  const additionalHeaders = extractFieldNames(additionalMembersData);
  const finalHeaders = headers.concat(additionalHeaders);
  return { finalHeaders, membersFullData };
}
