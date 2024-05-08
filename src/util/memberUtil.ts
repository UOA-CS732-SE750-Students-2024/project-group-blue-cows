import { GetInputsForClubDto } from "@/Dtos/formFieldInput/GetInputsForClubDto";
import { GetFormFieldInputDto } from "@/Dtos/formFieldInput/GetFormFieldInputDto";
import { studentData } from "@/gateway/member/getAllMembersForClub";

export interface studentFullData {
  id: string;
  name: string | null;
  email: string;
  upi: string | null;
  year_of_study: number | null;
  student_id: string | null;
  paid: boolean;
  isAdmin: boolean;
  formFieldInputs: GetFormFieldInputDto[];
}

export function combineMembersData(
  studentDataList: studentData[],
  inputsList: GetInputsForClubDto[]
): studentFullData[] {
  const studentDataMap: { [userId: string]: studentData } = {};
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
