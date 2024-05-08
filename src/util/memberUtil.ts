import { GetInputsForClubDto } from "@/Dtos/formFieldInput/GetInputsForClubDto";
import { GetFormFieldInputDto } from "@/Dtos/formFieldInput/GetFormFieldInputDto";
import { studentDataWithId } from "@/gateway/member/getAllMembersForClub";

export interface studentFullData extends studentDataWithId {
  formFieldInputs: GetFormFieldInputDto[];
}

export function combineMembersData(
  studentDataList: studentDataWithId[],
  inputsList: GetInputsForClubDto[]
): studentFullData[] {
  const studentDataMap: { [userId: string]: studentDataWithId } = {};
  studentDataList.forEach((data) => {
    studentDataMap[data.id] = data;
  });

  const combinedData: studentFullData[] = [];

  inputsList.forEach((inputs) => {
    const studentData = studentDataMap[inputs.userId];
    if (studentData) {
      const combinedObject = {
        ...studentData,
        formFieldInputs: inputs.formFieldInputs,
      };
      combinedData.push(combinedObject);
    }
  });
  return combinedData;
}

export function extractFieldNames(inputsList: GetInputsForClubDto[]): string[] {
  const fieldNames: string[] = [];

  inputsList.forEach((inputs) => {
    inputs.formFieldInputs.forEach((input) => {
      if (!fieldNames.includes(input.fieldName)) {
        fieldNames.push(input.fieldName);
      }
    });
  });

  return fieldNames;
}

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
