import { getAllMembersForClub } from "./getAllMembersForClub";

export async function getMembersDataInCSV(clubId: number) {

    try {
     const data = await getAllMembersForClub(clubId);

    // Format data into CSV format
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    } catch(error) {
        const errorMessage = "Error exporting data";
        return errorMessage
    }
}