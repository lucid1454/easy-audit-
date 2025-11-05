/*
const express = require('express');
const XLSX = require('xlsx');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.post('/validate', (req, res) => {
  const files = req.body.files; // Array of file objects { name, content }
  const results = [];

  if (files && files.length > 0) {
    files.forEach(file => {
      const { name, content } = file;
      try {
        if (name.endsWith('.xlsx')) {
          // Excel-specific validation
          const workbook = XLSX.read(Buffer.from(content, 'base64'), { type: 'buffer' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          const revDateStr = data[2][12]; // Row 3, column 13 (M)
          const revDate = new Date(revDateStr);
          const revMonth = revDate.getMonth() + 1;

          const header = data[3]; // Row 4
          const closedDateCol = header.indexOf('Closed Date');
          const remarksCol = header.indexOf('Remarks');

          let hasError = false;
          for (let i = 4; i < data.length; i++) { // Data from row 5
            const row = data[i];
            const closedDateStr = row[closedDateCol];
            if (closedDateStr) {
              const closedDate = new Date(closedDateStr);
              const closedMonth = closedDate.getMonth() + 1;
              if (closedMonth !== revMonth) {
                results.push({ folderName: '05 Test Case', fileName: name, errorSpotted: `Month mismatch: Rev Date month ${revMonth} vs Closed Date month ${closedMonth} (row ${i + 1})` });
                hasError = true;
              }
            } else if (closedDateCol !== -1) {
              for (let col = 0; col < header.length; col++) {
                if (col !== remarksCol && (row[col] === undefined || row[col] === null || row[col] === '')) {
                  results.push({ folderName: '05 Test Case', fileName: name, errorSpotted: `Empty cell at row ${i + 1}, column ${header[col]}` });
                  hasError = true;
                  break;
                }
              }
            }
          }
          if (!hasError) {
            results.push({ folderName: '05 Test Case', fileName: name, errorSpotted: 'No error' });
          }
        } else {
          // Non-Excel file validation
          if (Buffer.from(content, 'base64').length === 0) {
            results.push({ folderName: '05 Test Case', fileName: name, errorSpotted: 'File is empty' });
          } else {
            results.push({ folderName: '05 Test Case', fileName: name, errorSpotted: 'Non-tabular file, basic check passed' });
          }
        }
      } catch (error) {
        results.push({ folderName: '05 Test Case', fileName: name, errorSpotted: `Error processing file: ${error.message}` });
      }
    });
    res.json(results);
  } else {
    res.json([{ folderName: 'N/A', fileName: 'N/A', errorSpotted: 'No files provided' }]);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
*/