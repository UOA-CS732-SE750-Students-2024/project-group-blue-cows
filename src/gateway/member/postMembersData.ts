import "server-only";
import { getUserByEmail } from "../user/getUserByEmail";
import { postUser } from "../user/postUser";
import { getMemberForClub } from "./getMemberForClub";
import { postMember } from "./postMember";
import { putMember } from "./putMember";
import { separateDataForImport } from "@/util/memberUtil";
import { postFormFieldInputs } from "../formFieldInput/postFormFieldInputs";

export async function postMembersData(clubId: number, memberData: any[]) {
  for (const data of memberData) {
    const { mainData, additionalData } = separateDataForImport(data);
    const user = await getUserByEmail(mainData.email);
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

      await postFormFieldInputs(additionalData, clubId, id);
    }
  }
}
