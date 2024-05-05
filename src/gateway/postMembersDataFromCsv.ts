import { importCsvFile } from "@/util/csvUtils";
import { getAllMembersForClub } from "./getAllMembersForClub";

export async function postMembersDataFromCSV(clubId: number, filename: string) {
    //Need to get the JSON structure from the CSV function
    const values = importCsvFile(filename);
    console.log(values)
}