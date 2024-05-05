import { promises as fs } from 'fs';
import * as originalFS from "fs";
import csvParser from 'csv-parser';
import { studentData } from '@/gateway/getAllMembersForClub';
import { revalidatePath } from 'next/cache';

export const importCsvFile = async (formData: FormData) => {
    try {
        const file = formData.get("file") as File;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        await fs.writeFile(`./public/uploads/${file.name}`, buffer);

        return new Promise<studentData[]>((resolve, reject) => {
            const extractedValues: studentData[] = [];
            originalFS.createReadStream(`./public/uploads/${file.name}`)
                .pipe(csvParser())
                .on('data', (row) => {
                    extractedValues.push(row);
                })
                .on('end', () => {
                    console.log('Extracted values:', extractedValues);
                    revalidatePath("/");
                    resolve(extractedValues as studentData[]);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    } catch (error) {
        console.error('Error importing CSV file:', error);
        throw new Error('Error importing CSV file');
    }
};


export const exportCsvFile = (data: studentData[]) => {
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    return csv;
}

