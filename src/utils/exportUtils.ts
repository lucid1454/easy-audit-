import * as XLSX from 'xlsx';

export function exportValidationResultsToExcel(validationResults: { folderName: string; fileName: string; errorSpotted: string }[], projectName: string) {
  // Prepare data for Excel export
  const data = [
    ['Folder Name', 'File Name', 'Error Spotted'], // Header row
    ...validationResults.map(result => [result.folderName, result.fileName, result.errorSpotted])
  ];

  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Set column widths for better readability
  worksheet['!cols'] = [
    { wch: 25 }, // Folder Name
    { wch: 35 }, // File Name
    { wch: 50 }  // Error Spotted
  ];

  // Style header row to be bold
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  for (let col = 0; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (worksheet[cellAddress]) {
      worksheet[cellAddress].s = {
        font: { bold: true }
      };
    }
  }

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Validation Results');

  // Generate today's date in YYYY-MM-DD format
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD

  // Generate the file name
  const fileName = `${projectName} Verrors.xlsx`;

  // Write the workbook to a file and trigger download
  XLSX.writeFile(workbook, fileName);
}
