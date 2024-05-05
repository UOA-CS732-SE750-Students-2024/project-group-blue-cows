import fs from 'fs';
import csvParser from 'csv-parser';
import { studentData } from '@/gateway/getAllMembersForClub';

export const importCsvFile = (filename: string) => {
    const extractedValues: studentData[] = [];
    fs.createReadStream(filename)
    .pipe(csvParser())
    .on('data', (row) => {
        extractedValues.push(row);
    })
    .on('end', () => {
        console.log('Extracted values:', extractedValues);
        return extractedValues;
    });
}

export const exportCsvFile = (data: studentData[]) => {
    const csv = data.map(row => Object.values(row).join(',')).join('\n');
    return csv;
}

