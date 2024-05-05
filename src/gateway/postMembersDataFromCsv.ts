import { importCsvFile } from "@/util/csvUtils";

export async function postMembersDataFromCSV(clubId: number, formData: FormData) {
    //Need to get the JSON structure from the CSV function
    const studentData = await importCsvFile(formData);
    console.log('Extracted values:', studentData);
    return studentData;
    
    //With these values, we can then make insert Many to the database
}