import { objArrayToCsv } from "@/util/csvClientUtils";
import { membersData } from "./mockData";
import { studentData } from "@/gateway/member/getAllMembersForClub";

const headers = [
  "name",
  "email",
  "upi",
  "year_of_study",
  "student_id",
  "paid",
  "isAdmin",
];

test("should convert an array of objects to a CSV string", () => {
  const expectedCsv =
    "name,email,upi,year_of_study,student_id,paid,isAdmin\nTristan Mona,tmon261@aucklanduni.ac.nz,tmon261,4,ghi,false,true\nAlex Hope,ahop089@aucklanduni.ac.nz,ahop089,4,why,false,true";

  const csv = objArrayToCsv(headers, membersData);

  expect(csv).toEqual(expectedCsv);
});

test("should convert an array of objects to a CSV string when default header but data passed", () => {
  const membersData: studentData[] = [];

  const expectedCsv = "name,email,upi,year_of_study,student_id,paid,isAdmin";

  const csv = objArrayToCsv(headers, membersData);

  expect(csv).toEqual(expectedCsv);
});
