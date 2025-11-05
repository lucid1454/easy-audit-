import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { exportValidationResultsToExcel } from "@/utils/exportUtils";

interface ValidationResult {
  folderName: string;
  fileName: string;
  errorSpotted: string;
}

const Results = () => {
  const location = useLocation();
  const validationResults: ValidationResult[] = location.state?.validationResults || [];
  const projectName: string = location.state?.projectName || 'Project';

  const handleExport = () => {
    exportValidationResultsToExcel(validationResults, projectName);
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Validation Results</h1>
            <p className="text-lg text-muted-foreground">
              Review the validation results for your project folder
            </p>
          </div>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Results Summary</h2>
              <Button
                onClick={handleExport}
                className="gap-2"
                disabled={validationResults.length === 0}
              >
                <Download className="w-4 h-4" />
                Export to Excel
              </Button>
            </div>

            {validationResults.length > 0 ? (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Folder Name</TableHead>
                      <TableHead>File Name</TableHead>
                      <TableHead>Error Spotted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validationResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{result.folderName}</TableCell>
                        <TableCell>{result.fileName}</TableCell>
                        <TableCell>{result.errorSpotted}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No validation results available.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
