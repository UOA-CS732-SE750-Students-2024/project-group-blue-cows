import {
  objArrayToCsv,
  validateExtendedFieldInputs,
} from "@/util/csvClientUtils";
import { membersData } from "./mockData";
import { studentData } from "@/interfaces/studentData";

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

test("should validate correct inputs", () => {
  const fields = [
    { name: "Name", description: "Description", type: "short" },
    { name: "Description", description: "Another description", type: "long" },
  ];

  expect(() => validateExtendedFieldInputs(fields)).not.toThrow();
});

test("should throw error for invalid field type", () => {
  const fields = [
    { name: "Name", description: "Description", type: "invalid" },
  ];

  expect(() => validateExtendedFieldInputs(fields)).toThrow(
    "Type must be either 'short' or 'long'"
  );
});

test("should throw error for duplicate field names", () => {
  const fields = [
    { name: "Name", description: "Description 1", type: "short" },
    { name: "Name", description: "Description 2", type: "long" },
  ];

  expect(() => validateExtendedFieldInputs(fields)).toThrow(
    "Field names must be unique"
  );
});
