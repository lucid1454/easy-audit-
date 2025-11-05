// import * as XLSX from 'xlsx';

// export async function validateFolder5(files: File[]): Promise<{ folderName: string; fileName: string; errorSpotted: string }[]> {
//   const results: { folderName: string; fileName: string; errorSpotted: string }[] = [];

//   if (files.length === 0) {
//     return [{ folderName: '05. test case report', fileName: 'N/A', errorSpotted: 'No files found' }];
//   }

//   for (const file of files) {
//     if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
//       results.push({ folderName: '05. test case report', fileName: file.name, errorSpotted: 'Non-Excel file' });
//       continue;
//     }
//     if (file.name.startsWith('~$')) {
//       continue; // Skip temporary Excel files
//     }


//     try {
//       const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' }) as (string | number | Date | undefined)[][];

//       let hasErrors = false;

//       // CHANGE 1: Start from rowIndex = 4 (which is Excel row 5)
//       for (let rowIndex = 4; rowIndex < data.length; rowIndex++) {
//         const row = data[rowIndex] || [];

//         // ADDED: Skip completely empty rows to avoid false positives
//         if (row.every(cell => (cell === undefined || cell === null || (typeof cell === 'string' && cell.trim() === '')))) {
//           continue; 
//         }

//         // CHANGE 2 & 3: Check columns 0 (Col A) through 12 (Col M)
//         // This excludes colIndex = 13 (Col N), which is "Remarks"
//         for (let colIndex = 0; colIndex <= 12; colIndex++) { 
//           const cell = row[colIndex];
//           if (cell === undefined || cell === null || (typeof cell === 'string' && cell.trim() === '')) {
//             const colLetter = String.fromCharCode(65 + colIndex); // 65 + 0 = 'A'
//             const rowNum = rowIndex + 1; // 4 + 1 = 5
//             results.push({ folderName: '05. test case report', fileName: file.name, errorSpotted: `Empty cell at ${colLetter}${rowNum}` });
//             hasErrors = true;
//           }
//         }
//       }

//       if (!hasErrors) {
//         results.push({ folderName: '05. test case report', fileName: file.name, errorSpotted: 'No errors' });
//       }
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Unknown error';
//       results.push({ folderName: '05. test case report', fileName: file.name, errorSpotted: `Error reading file: ${message}` });
//     }
//   }

//   return results;
// }







// import * as XLSX from 'xlsx';

// export async function validateFolder5(
//   files: File[]
// ): Promise<{ folderName: string; fileName: string; sheetName: string; errorSpotted: string }[]> {
//   const results: { folderName: string; fileName: string; sheetName: string; errorSpotted: string }[] = [];

//   if (files.length === 0) {
//     return [{ folderName: '05. test case report', fileName: 'N/A', sheetName: 'N/A', errorSpotted: 'No files found' }];
//   }

//   for (const file of files) {
//     if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
//       results.push({
//         folderName: '05. test case report',
//         fileName: file.name,
//         sheetName: 'N/A',
//         errorSpotted: 'Non-Excel file'
//       });
//       continue;
//     }
//     if (file.name.startsWith('~$')) continue; // skip temp Excel files

//     try {
//       const data = await file.arrayBuffer();
//       const workbook = XLSX.read(data, { type: 'array' });

//       // ✅ Use only the first sheet
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonSheet = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1, defval: '' });

//       const range = sheet['!ref'] ? XLSX.utils.decode_range(sheet['!ref']) : { s: { c: 0 }, e: { c: 12 } };
//       const lastCol = Math.min(range.e.c, 12); // limit to M (index 12)

//       let hasErrors = false;

//       // Start from row 5 (index 4)
//       // Find last row that actually contains any data
// const lastDataRow = jsonSheet
//   .map((r, i) => (r.some(cell => cell !== '' && cell !== undefined && cell !== null) ? i : -1))
//   .filter(i => i >= 0)
//   .pop() || 0;

// // Loop only up to the last data row
// for (let rowIndex = 4; rowIndex <= lastDataRow; rowIndex++) {

      
//        const row = jsonSheet[rowIndex] || [];

//         for (let colIndex = 0; colIndex <= lastCol; colIndex++) {
//           const cell = row[colIndex];
//           if (cell === undefined || cell === null || (typeof cell === 'string' && cell.trim() === '')) {
//             const colLetter = String.fromCharCode(65 + colIndex);
//             const rowNum = rowIndex + 1;
//             results.push({
//               folderName: '05. test case report',
//               fileName: file.name,
//               sheetName,
//               errorSpotted: `Empty cell at ${colLetter}${rowNum}`
//             });
//             hasErrors = true;
//           }
//         }
//       }

//       if (!hasErrors) {
//         results.push({
//           folderName: '05. test case report',
//           fileName: file.name,
//           sheetName,
//           errorSpotted: 'fully empty'
//         });
//       }
//     } catch (err) {
//       const message = err instanceof Error ? err.message : 'Unknown error';
//       results.push({
//         folderName: '05. test case report',
//         fileName: file.name,
//         sheetName: 'N/A',
//         errorSpotted: `Error reading file: ${message}`
//       });
//     }
//   }

//   return results;
// }








import * as XLSX from 'xlsx';

export async function validateFolder5(
  files: File[]
): Promise<{ folderName: string; fileName: string; sheetName: string; errorSpotted: string }[]> {
  const results: { folderName: string; fileName: string; sheetName: string; errorSpotted: string }[] = [];

  for (const file of files) {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) continue;
    if (file.name.startsWith('~$')) continue;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonSheet = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1, defval: '' });

      // ✅ detect last row with any data
      const lastDataRow = jsonSheet
        .map((r, i) => (r.some(cell => cell !== '' && cell !== undefined && cell !== null) ? i : -1))
        .filter(i => i >= 0)
        .pop() || 0;

      const lastCol = 12; // up to column M
      let hasErrors = false;

      // ✅ Empty cell check (ignore N)
      for (let rowIndex = 4; rowIndex <= lastDataRow; rowIndex++) {
        const row = jsonSheet[rowIndex] || [];
        for (let colIndex = 0; colIndex <= lastCol; colIndex++) {
          const cell = row[colIndex];
          if (cell === '' || cell === undefined || cell === null) {
            const colLetter = String.fromCharCode(65 + colIndex);
            results.push({
              folderName: '05. test case report',
              fileName: file.name,
              sheetName,
              errorSpotted: `Empty cell at ${colLetter}${rowIndex + 1}`
            });
            hasErrors = true;
          }
        }
      }

      // ✅ Month comparison logic
      const dateInN3 = jsonSheet[2]?.[13]; // row 3 col N
      const lastMRowIndex = [...Array(lastDataRow + 1).keys()]
        .reverse()
        .find(i => jsonSheet[i]?.[12]);

      if (dateInN3 && lastMRowIndex !== undefined) {
        const lastMDate = jsonSheet[lastMRowIndex][12];

        const parseExcelDate = (val: any): Date | null => {
          if (!val) return null;
          if (typeof val === 'number') {
            // Excel serial date
            return XLSX.SSF.parse_date_code(val)
              ? new Date(XLSX.SSF.parse_date_code(val).y, XLSX.SSF.parse_date_code(val).m - 1, XLSX.SSF.parse_date_code(val).d)
              : null;
          }
          const d = new Date(val);
          return isNaN(d.getTime()) ? null : d;
        };

        const dateN = parseExcelDate(dateInN3);
        const dateM = parseExcelDate(lastMDate);

        if (dateN && dateM) {
          if (dateN.getMonth() !== dateM.getMonth()) {
            results.push({
              folderName: '05. test case report',
              fileName: file.name,
              sheetName,
              errorSpotted: `Month mismatch: N3 (${dateN.toLocaleDateString()}) vs M${lastMRowIndex + 1} (${dateM.toLocaleDateString()})`
            });
            hasErrors = true;
          }
        } else {
          results.push({
            folderName: '05. test case report',
            fileName: file.name,
            sheetName,
            errorSpotted: 'Invalid or missing date format in N3 or last M cell'
          });
          hasErrors = true;
        }
      }

      if (!hasErrors) {
        results.push({
          folderName: '05. test case report',
          fileName: file.name,
          sheetName,
          errorSpotted: 'fully empty'
        });
      }
    } catch (err) {
      results.push({
        folderName: '05. test case report',
        fileName: file.name,
        sheetName: 'N/A',
        errorSpotted: `Error reading file: ${(err as Error).message}`
      });
    }
  }

  return results;
}
