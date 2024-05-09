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

export const mapToObject = (data: studentFullData): any => {
  const {
    name,
    email,
    upi,
    year_of_study,
    student_id,
    paid,
    isAdmin,
    formFieldInputs,
  } = data;
  const result: any = {
    name,
    email,
    upi,
    year_of_study,
    student_id,
    paid,
    isAdmin,
  };

  for (const input of formFieldInputs) {
    result[input.fieldName] = input.value;
  }
  return result;
};
