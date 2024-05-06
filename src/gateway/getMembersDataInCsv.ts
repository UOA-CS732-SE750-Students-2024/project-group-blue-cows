import { exportCsvFile } from "@/util/csvUtils";
import { getAllMembersForClub } from "./getAllMembersForClub";

export async function getMembersDataInCSV(clubId: number) {

    try {
        const {headers, membersData} = await getAllMembersForClub(clubId);
        return exportCsvFile(headers, membersData);

    } catch(error) {
        throw new Error("Problem with exporting data")
    }
}