import { importCsvFile, studentAllData } from "@/util/csvUtils";
import { getUserByEmail } from "./getUserByEmail";
import { putMember } from "./putMember";
import { postMember } from "./postMember";
import { postUser } from "./postUser";
import { getMemberForClub } from "./getMemberForClub";

export async function postMembersData(clubId: number, memberData: studentAllData[]) {
    memberData.map(async (data) => {
    const user = await getUserByEmail(data.email);
    let id = user?.id;
    if (!user) {
      const newId = await postUser({
        name: data.name,
        email: data.email,
        upi: data.upi,
        year_of_study: data.year_of_study,
        student_id: data.student_id,
      });
      if (typeof newId === "string") {
        id = newId;
      }
    }

    if (id) {
      const result = await getMemberForClub(id, clubId);
      console.log(result);
      if (result) {
        await putMember(clubId, id, { paid: data.paid, isAdmin: data.isAdmin });
      } else {
        await postMember({
          club: clubId,
          user: id,
          paid: data.paid,
          isAdmin: data.isAdmin,
        });
      }
    }
  });
}
