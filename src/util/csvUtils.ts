"use server";
import "server-only";
import { promises as fs } from "fs";
import * as originalFS from "fs";
import csvParser from "csv-parser";
import { studentData } from "@/gateway/getAllMembersForClub";
import { revalidatePath } from "next/cache";
import path from "path";
import { ENVIRONMENT } from "@/config/env";

export interface studentAllData extends studentData {
  paid: boolean;
  isAdmin: boolean;
}

export const parseCsvFile = async (filename: string) => {
  return new Promise<studentAllData[]>((resolve, reject) => {
    const extractedValues: studentAllData[] = [];
    originalFS
      .createReadStream(filename)
      .pipe(csvParser())
      .on("data", (row) => {
        extractedValues.push(row);
      })
      .on("end", () => {
        revalidatePath("/");
        resolve(extractedValues as studentAllData[]);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export const importCsvFile = async (formData: FormData) => {
  let dataDir = "/tmp";
  if (ENVIRONMENT === "DEV") {
    dataDir = path.join(process.cwd(), "./data");
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(dataDir, file.name);
    await fs.writeFile(filePath, buffer);
    const extractedValues = await parseCsvFile(filePath);
    return extractedValues;
  } catch (error) {
    console.error("Error importing CSV file:", error);
    throw new Error("Error importing CSV file");
  }
};
