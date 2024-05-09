import "server-only";
import { postFormFieldInputs } from "../formFieldInput/postFormFieldInputs";
import { getUserByEmail } from "../user/getUserByEmail";
import { postUser } from "../user/postUser";
import { getMemberForClub } from "./getMemberForClub";
import { postMember } from "./postMember";
import { putMember } from "./putMember";
import { separateDataForImport } from "@/util/memberUtil";

export async function postMembersData(clubId: number, memberData: any[]) {
  for (const data of memberData) {
    const { mainData, additionalData } = separateDataForImport(data);
    const user = await getUserByEmail(mainData.email);
    let id = user?.id;
    if (!user) {
      const newId = await postUser({
        name: mainData.name,
        email: mainData.email,
        upi: mainData.upi,
        year_of_study: mainData.year_of_study,
        student_id: mainData.student_id,
      });
      if (!newId) throw new Error("Invalid user id");
      id = newId;
    }

    if (!id) throw new Error("Invalid user id");

    if (id) {
      const result = await getMemberForClub(id, clubId);
      if (result) {
        await putMember(clubId, id, {
          paid: mainData.paid,
          isAdmin: mainData.isAdmin,
        });
      } else {
        await postMember({
          club: clubId,
          user: id,
          paid: mainData.paid,
          isAdmin: mainData.isAdmin,
        });
      }
    }
    postFormFieldInputs(additionalData, clubId, id);
  }
}
