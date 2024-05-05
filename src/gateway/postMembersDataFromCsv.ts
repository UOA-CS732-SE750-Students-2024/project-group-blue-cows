import { importCsvFile } from "@/util/csvUtils";

export async function postMembersDataFromCSV(clubId: number, formData: FormData) {
    //Need to get the JSON structure from the CSV function
    const values = await importCsvFile(formData);
    console.log(values)

    //With these values, we can then make insert Many to the database
}