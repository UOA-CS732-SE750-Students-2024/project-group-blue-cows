import { promises as fs } from 'fs';
import * as originalFS from "fs";
import csvParser from 'csv-parser';
import { studentData } from '@/gateway/getAllMembersForClub';
import { revalidatePath } from 'next/cache';

export const importCsvFile = async(formData: FormData) => {
    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`./public/uploads/${file.name}`, buffer);
    const extractedValues: studentData[] = [];
    originalFS.createReadStream(`./public/uploads/${file.name}`)
    .pipe(csvParser())
    .on('data', (row) => {
        extractedValues.push(row);
    })
    .on('end', () => {
        console.log('Extracted values:', extractedValues);
        revalidatePath("/");
        return extractedValues;
    });
    
    return extractedValues;
}

export const exportCsvFile = (data: studentData[]) => {
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    return csv;
}

