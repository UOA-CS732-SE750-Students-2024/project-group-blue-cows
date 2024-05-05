import { exportCsvFile } from "@/util/csvUtils";
import { getAllMembersForClub } from "./getAllMembersForClub";

export async function getMembersDataInCSV(clubId: number) {

    try {
     const data = await getAllMembersForClub(clubId);
     return exportCsvFile(data);

    } catch(error) {
        throw new Error("Problem with exporting data")
    }
}