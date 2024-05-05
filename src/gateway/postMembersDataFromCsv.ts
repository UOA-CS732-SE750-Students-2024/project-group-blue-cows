import { importCsvFile } from "@/util/csvUtils";
import { getUserByEmail } from "./getUserByEmail";
import { putMember } from "./putMember";
import { postMember } from "./postMember";
import {postUser} from "./postUser";
import { getMemberForClub } from "./getMemberForClub";

export async function postMembersDataFromCSV(clubId: number, formData: FormData) {
    const studentData = await importCsvFile(formData);
    studentData.map(async (data) => {
        const user = await getUserByEmail(data.email);
        let id = ""
        if(!user) {            
           const newId = await postUser(
            {
                name: data.name, 
                email: data.email, 
                upi: data.upi, 
                year: data.year, 
                studentId : data.studentId,
            });
            if (typeof newId === 'string') {
                id = newId
            }
            else {
                return "Failed to create new user";
            }
        }
        
        const result = await getMemberForClub(id, clubId)
        if(result) {
            await putMember(clubId, id, {paid: data.paid, isAdmin: data.isAdmin})
        }
        else {
            await postMember({club: clubId, user: id, paid: data.paid, isAdmin: data.isAdmin})
        }
    })
}