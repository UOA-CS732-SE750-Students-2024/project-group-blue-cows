import { studentData } from "@/gateway/getAllMembersForClub";

export async function downloadAsCsv(
  headers: string[],
  objArray: any[],
  csvFileName: string,
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

const objArrayToCsv = (headers: string[], data: studentData[]) => {
  const csv = [
    headers.join(","),
    ...data.map((row) => Object.values(row).join(",")),
  ].join("\n");
  return csv;
};

export function importFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".csv";
  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData.get("file"));
    }
  };
  input.click();
}
