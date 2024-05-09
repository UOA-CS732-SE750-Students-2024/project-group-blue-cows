import { GetExtendedFormFieldDto } from "@/Dtos/extendedFormField/GetExtendedFormFieldDto";
import { studentData } from "@/gateway/member/getAllMembersForClub";

export async function downloadAsCsv(
  headers: string[],
  objArray: any[],
  csvFileName: string
) {
  const csvData = objArrayToCsv(headers, objArray);
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = csvFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export const objArrayToCsv = (headers: string[], data: any[]) => {
  const csv = [
    headers.join(","),
    ...data.map((row) => Object.values(row).join(",")),
  ].join("\n");
  return csv;
};

export async function importFile(callback: (formData: FormData) => void) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".csv";
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) throw new Error("No file selected");

    const formData = new FormData();
    formData.append("file", file);
    callback(formData);
  };
  input.click();
}

// This function should be called whenever an admin attempts to change the club's extended fields
export function validateExtendedFieldInputs(fields: GetExtendedFormFieldDto[]) {
  fields.forEach((field) => {
    // Name required, description nonnull, type required enum
    if (!field.name) throw new Error("Field name is required");
    field.name = field.name.trim();
    field.description ??= "";
    field.type = field.type.trim().toLowerCase();
    if (!["short", "long"].includes(field.type)) {
      throw new Error("Type must be either 'short' or 'long'");
    }
  });

  // Check no duplicate field names
  const uniqueFieldNames = new Set(fields.map((field) => field.name));
  if (uniqueFieldNames.size !== fields.length) {
    console.log("here");
    throw new Error("Field names must be unique");
  }
  console.log("No issues :)");
}
