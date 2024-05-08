import { objArrayToCsv } from "@/util/csvClientUtils";
import { membersData } from "./mockData";

test("should convert an array of objects to a CSV string", () => {
  const headers = [
    "name",
    "email",
    "upi",
    "year_of_study",
    "student_id",
    "paid",
    "isAdmin",
  ];

  // Expected CSV string
  const expectedCsv =
    "name,email,upi,year_of_study,student_id,paid,isAdmin\nTristan Mona,tmon261@aucklanduni.ac.nz,tmon261,4,ghi,false,true\nAlex Hope,ahop089@aucklanduni.ac.nz,ahop089,4,why,false,true";

  // Call the function
  const csv = objArrayToCsv(headers, membersData);

  // Assertion
  expect(csv).toEqual(expectedCsv);
});
