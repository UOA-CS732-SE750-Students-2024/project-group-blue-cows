import { GetInputsForClubDto } from "@/Dtos/formFieldInput/GetInputsForClubDto";
import { GetFormFieldInputDto } from "@/Dtos/formFieldInput/GetFormFieldInputDto";
import {
  studentData,
  studentDataWithId,
} from "@/gateway/member/getAllMembersForClub";
import { PostFormFieldInputDto } from "@/Dtos/formFieldInput/PostFormFieldInputDto";

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

export const separateDataForImport = (
  expectedMappedObject: any
): { mainData: studentData; additionalData: PostFormFieldInputDto[] } => {
  const mainData: studentData = {
    name: null,
    email: "",
    upi: null,
    year_of_study: null,
    student_id: null,
    paid: false,
    isAdmin: false,
  };
  const additionalData: PostFormFieldInputDto[] = [];

  const mainDataFields = [
    "name",
    "email",
    "upi",
    "year_of_study",
    "student_id",
    "paid",
    "isAdmin",
  ];

  for (const key in expectedMappedObject) {
    if (!mainDataFields.includes(key)) {
      if (typeof expectedMappedObject[key] !== "string") {
        throw Error("Extended field value must be a string");
      }
      additionalData.push({ fieldName: key, value: expectedMappedObject[key] });
    } else {
      if (key in mainData) {
        if (key === "name") {
          mainData.name = expectedMappedObject[key];
        } else if (key === "email") {
          mainData.email = expectedMappedObject[key];
        } else if (key === "upi") {
          mainData.upi = expectedMappedObject[key];
        } else if (key === "year_of_study") {
          mainData.year_of_study = expectedMappedObject[key];
        } else if (key === "student_id") {
          mainData.student_id = expectedMappedObject[key];
        } else if (key === "paid") {
          mainData.paid = expectedMappedObject[key];
        } else if (key === "isAdmin") {
          mainData.isAdmin = expectedMappedObject[key];
        }
      }
    }
  }

  return { mainData, additionalData };
};
