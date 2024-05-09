import { studentAllData } from "@/util/csvUtils";
import "server-only";
import { postFormFieldInputs } from "../formFieldInput/postFormFieldInputs";
import { getUserByEmail } from "../user/getUserByEmail";
import { postUser } from "../user/postUser";
import { getMemberForClub } from "./getMemberForClub";
import { putMember } from "./putMember";

export async function postMembersData(
  clubId: number,
  memberData: studentAllData[]
) {
  for (const data of memberData) {
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
      if (!newId) throw new Error("Invalid user id");
      id = newId;
    }

    const {
      name,
      email,
      upi,
      year_of_study,
      student_id,
      paid,
      isAdmin,
      ...extended
    } = data;
    if (!id) throw new Error("Invalid user id");
    const extendedfields = Object.entries(extended).map(([fieldName, value]) => {
      if (typeof value !== "string") throw Error("Extended field value must be a string");
      return ({
      fieldName,
      value,
    });
  });
    postFormFieldInputs(extendedfields, clubId, id);

    if (id) {
      const result = await getMemberForClub(id, clubId);
      if (!result)
        throw new Error("postFormFieldInputs did not create a member");
      await putMember(clubId, id, { paid: data.paid, isAdmin: data.isAdmin });
    }
  }
}
