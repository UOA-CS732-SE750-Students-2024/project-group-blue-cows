import { objArrayToCsv } from "@/util/csvClientUtils";

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
  const membersData = [
    {
      name: "Tristan Mona",
      email: "tmon261@aucklanduni.ac.nz",
      upi: "tmon261",
      year_of_study: 4,
      student_id: "ghi",
      paid: false,
      isAdmin: true,
    },
    {
      name: "Alex Hope",
      email: "ahop089@aucklanduni.ac.nz",
      upi: "ahop089",
      year_of_study: 4,
      student_id: "why",
      paid: false,
      isAdmin: true,
    },
  ];
  // Expected CSV string
  const expectedCsv =
    "name,email,upi,year_of_study,student_id,paid,isAdmin\nTristan Mona,tmon261@aucklanduni.ac.nz,tmon261,4,ghi,false,true\nAlex Hope,ahop089@aucklanduni.ac.nz,ahop089,4,why,false,true";

  // Call the function
  const csv = objArrayToCsv(headers, membersData);

  // Assertion
  expect(csv).toEqual(expectedCsv);
});
