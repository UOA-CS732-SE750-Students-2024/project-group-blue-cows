import { getAllMembersForClub } from "./getAllMembersForClub";

export async function getMembersDataInCSV(clubId: number) {

    try {
     const data = await getAllMembersForClub(clubId);
     const csv = data.map(row => Object.values(row).join(',')).join('\n');
     return csv;

    } catch(error) {
        throw new Error("Problem with exporting data")
    }
}