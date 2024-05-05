import { importCsvFile } from "@/util/csvUtils";
import { getUserByEmail } from "./getUserByEmail";
import { putMember } from "./putMember";

export async function postMembersDataFromCSV(clubId: number, formData: FormData) {
    //Need to get the JSON structure from the CSV function
    const studentData = await importCsvFile(formData);

    //Check if the email exists
    studentData.map(async (data) => {
        if(data.email) {
            const user = await getUserByEmail(data.email)
            if(user) {
                //await putMember(clubId, user.id, )

            }

        }
        
    })


    //If the email exists then fetch the id and we should be able to add a member easily

    //If email does not exist
    //We will need to create a new user with the fields

}