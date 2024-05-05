import { toastError } from "./toastUtils";

export function downloadAsCsv(objArray: Object[], csvFileName: string) {
  try {
    const csvData = objArrayToCsv(objArray);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = csvFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    toastError("Failed to export. Please try again.");
  }
}

function objArrayToCsv(objArray: Object[]) {
  try {
    return objArray.map((row) => Object.values(row).join(",")).join("\n");
  } catch (error) {
    throw new Error(
      `Problem converting data to CSV format. Received data: ${objArray}`,
    );
  }
}
