"use server";
import { ENVIRONMENT } from "@/config/env";
import csvParser from "csv-parser";
import dotenv from "dotenv";
import * as originalFS from "fs";
import { promises as fs } from "fs";
import path from "path";
import "server-only";

dotenv.config();

export const parseCsvFile = async (filename: string) => {
  return new Promise<any[]>((resolve, reject) => {
    const extractedValues: any[] = [];
    originalFS
      .createReadStream(filename)
      .pipe(csvParser())
      .on("data", (row) => {
        extractedValues.push(row);
      })
      .on("end", () => {
        resolve(extractedValues);
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
    throw new Error("Error importing CSV file");
  }
};
