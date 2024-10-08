import { GetInputsForClubDto } from "@/Dtos/formFieldInput/GetInputsForClubDto";
import { studentDataWithId } from "@/interfaces/studentDataWithId";
import { studentFullData } from "@/interfaces/studentFullData";
import {
  combineMembersData,
  extractFieldNames,
  mapToObject,
  separateDataForImport,
} from "@/util/memberUtil";

it("combines student data with form field inputs correctly", () => {
  const studentDataList: studentDataWithId[] = [
    {
      id: "user1",
      name: "John",
      email: "john@example.com",
      upi: null,
      year_of_study: 2,
      student_id: "12345",
      paid: true,
      isAdmin: false,
    },
  ];

  const inputsList: GetInputsForClubDto[] = [
    {
      userId: "user1",
      formFieldInputs: [
        { fieldName: "input1", value: "value1" },
        { fieldName: "input2", value: "value2" },
      ],
    },
  ];

  // Expected output
  const expectedCombinedData = [
    {
      id: "user1",
      name: "John",
      email: "john@example.com",
      upi: null,
      year_of_study: 2,
      student_id: "12345",
      paid: true,
      isAdmin: false,
      formFieldInputs: [
        { fieldName: "input1", value: "value1" },
        { fieldName: "input2", value: "value2" },
      ],
    },
  ];

  const combinedData = combineMembersData(studentDataList, inputsList);

  // Assertion
  expect(combinedData).toEqual(expectedCombinedData);
});

it("returns an array of unique field names extracted from form field inputs", () => {
  const inputsList: GetInputsForClubDto[] = [
    {
      userId: "user1",
      formFieldInputs: [
        { fieldName: "input1", value: "value1" },
        { fieldName: "input2", value: "value2" },
      ],
    },
  ];

  const expectedFieldNames = ["input1", "input2"];

  const fieldNames = extractFieldNames(inputsList);

  expect(fieldNames).toEqual(expectedFieldNames);
});

it("returns an empty array when no form field inputs are provided", () => {
  const inputsList: GetInputsForClubDto[] = [];

  const expectedFieldNames: string[] = [];

  const fieldNames = extractFieldNames(inputsList);

  expect(fieldNames).toEqual(expectedFieldNames);
});

it("returns an empty array when form field inputs have duplicate field names", () => {
  const inputsList: GetInputsForClubDto[] = [
    {
      userId: "user1",
      formFieldInputs: [
        { fieldName: "input1", value: "value1" },
        { fieldName: "input1", value: "value2" },
      ],
    },
  ];

  const expectedFieldNames: string[] = ["input1"];
  const fieldNames = extractFieldNames(inputsList);
  expect(fieldNames).toEqual(expectedFieldNames);
});

it("maps StudentFullData to the desired format", () => {
  const studentData: studentFullData = {
    id: "user1",
    name: "John",
    email: "john@example.com",
    upi: null,
    year_of_study: 2,
    student_id: "12345",
    paid: true,
    isAdmin: false,
    formFieldInputs: [
      { fieldName: "input1", value: "value1" },
      { fieldName: "input2", value: "value2" },
    ],
  };

  // Expected output
  const expectedMappedObject = {
    name: "John",
    email: "john@example.com",
    upi: null,
    year_of_study: 2,
    student_id: "12345",
    paid: true,
    isAdmin: false,
    input1: "value1",
    input2: "value2",
  };

  const result = mapToObject(studentData);

  expect(result).toEqual(expectedMappedObject);
});

it("should separate main data and additional data correctly", () => {
  const expectedMappedObject = {
    name: "John",
    email: "john@example.com",
    upi: null,
    year_of_study: 2,
    student_id: "12345",
    paid: true,
    isAdmin: false,
    input1: "value1",
    input2: "value2",
  };

  const { mainData, additionalData } =
    separateDataForImport(expectedMappedObject);

  expect(mainData).toEqual({
    name: "John",
    email: "john@example.com",
    upi: null,
    year_of_study: 2,
    student_id: "12345",
    paid: true,
    isAdmin: false,
  });

  expect(additionalData).toEqual([
    { fieldName: "input1", value: "value1" },
    { fieldName: "input2", value: "value2" },
  ]);
});

it("should throw an error if input1 or input2 is not a string", () => {
  const expectedMappedObject = {
    name: "John",
    email: "john@example.com",
    upi: null,
    year_of_study: 2,
    student_id: "12345",
    paid: true,
    isAdmin: false,
    input1: "1",
    input2: 3, // Not a string
  };

  expect(() => separateDataForImport(expectedMappedObject)).toThrow();
});
