/*import { FolderItem, validateFolderStructure } from '../utils/folderUtils';

const validationMap: Record<
  string,
  (files: File[]) => Promise<{ folderName: string; fileName: string; errorSpotted: string }[]>
> = {
  '01. PROPOSAL DOCUMENT': (files) => import('./folder1').then((m) => m.validateFolder1(files)),
  '02. REQUIREMENT_CONSOLIDATED DESIGN DOCUMENT': (files) => import('./folder2').then((m) => m.validateFolder2(files)),
  '03. PROJECT PLAN': (files) => import('./folder3').then((m) => m.validateFolder3(files)),
  '04. SCHEDULE, METRICS & PERFORMANCE REPORT': (files) => import('./folder4').then((m) => m.validateFolder4(files)),
  '05. TEST CASE REPORT': (files) => import('./folder5').then((m) => m.validateFolder5(files)),
  '06. CUSTOMER REPORTED ISSUE': (files) => import('./folder6').then((m) => m.validateFolder6(files)),
  '07. RELEASE DOCUMENT': (files) => import('./folder7').then((m) => m.validateFolder7(files)),
  '08. CUSTOMER FEEDBACK REPORT': (files) => import('./folder8').then((m) => m.validateFolder8(files)),
  '09. PROJECT CLOSURE REPORT': (files) => import('./folder9').then((m) => m.validateFolder9(files)),
  '10. MOM': (files) => import('./folder10').then((m) => m.validateFolder10(files)),
  '11. WEEKLY STATUS REPORT': (files) => import('./folder11').then((m) => m.validateFolder11(files)),
};

export const runValidation = async (
  tree: FolderItem,
  files: FileList
): Promise<{ folderName: string; fileName: string; errorSpotted: string }[]> => {
  try {
    // ✅ Step 1: Validate folder structure
    const structureErrors = validateFolderStructure(tree);
    if (structureErrors.length > 0) return structureErrors;

    const results: { folderName: string; fileName: string; errorSpotted: string }[] = [];

    // ✅ Step 2: Loop through all subfolders (1–11)
    if (tree?.children) {
      for (const child of tree.children) {
        if (child.type === 'folder') {
          const validateFunc = validationMap[child.name];
          const folderFiles = Array.from(files).filter((file) =>
            file.webkitRelativePath.toLowerCase().startsWith(
              `${tree.name}/${child.name}`.toLowerCase() + '/'
            )
          );

          // ✅ If folder exists but has no files
          if (folderFiles.length === 0) {
            results.push({
              folderName: child.name,
              fileName: 'N/A',
              errorSpotted: 'Folder is empty — no files found',
            });
            continue; // move to next folder
          }

          // ✅ If folder has a validation logic defined
          if (validateFunc) {
            const folderResults = await validateFunc(folderFiles);
            results.push(...folderResults);
          } else {
            results.push({
              folderName: child.name,
              fileName: 'N/A',
              errorSpotted: 'No validation logic defined',
            });
          }
        }
      }
    }

    // ✅ Step 3: If no folders were processed at all
    return results.length > 0
      ? results
      : [{ folderName: 'N/A', fileName: 'N/A', errorSpotted: 'No folders processed' }];
  } catch (error: any) {
    return [
      {
        folderName: 'System Error',
        fileName: 'N/A',
        errorSpotted: `Validation failed: ${error.message}`,
      },
    ];
  }
};  this validation dispatcher
*/









import { FolderItem, validateFolderStructure } from "../utils/folderUtils";

const validationMap: Record<
  string,
  (files: File[]) => Promise<{ folderName: string; fileName: string; errorSpotted: string }[]>
> = {
  "01. PROPOSAL DOCUMENT": (files) => import("./folder1").then((m) => m.validateFolder1(files)),
  "02. REQUIREMENT_CONSOLIDATED DESIGN DOCUMENT": (files) => import("./folder2").then((m) => m.validateFolder2(files)),
  "03. PROJECT PLAN": (files) => import("./folder3").then((m) => m.validateFolder3(files)),
  "04. SCHEDULE, METRICS & PERFORMANCE REPORT": (files) => import("./folder4").then((m) => m.validateFolder4(files)),
  "05. TEST CASE REPORT": (files) => import("./folder5").then((m) => m.validateFolder5(files)),
  "06. CUSTOMER REPORTED ISSUE": (files) => import("./folder6").then((m) => m.validateFolder6(files)),
  "07. RELEASE DOCUMENT": (files) => import("./folder7").then((m) => m.validateFolder7(files)),
  "08. CUSTOMER FEEDBACK REPORT": (files) => import("./folder8").then((m) => m.validateFolder8(files)),
  "09. PROJECT CLOSURE REPORT": (files) => import("./folder9").then((m) => m.validateFolder9(files)),
  "10. MOM": (files) => import("./folder10").then((m) => m.validateFolder10(files)),
  "11. WEEKLY STATUS REPORT": (files) => import("./folder11").then((m) => m.validateFolder11(files)),
};

export const runValidation = async (
  tree: FolderItem,
  files: FileList
): Promise<{ folderName: string; fileName: string; errorSpotted: string }[]> => {
  try {
    const structureErrors = validateFolderStructure(tree);
    const results: { folderName: string; fileName: string; errorSpotted: string }[] = [];

    // ✅ include structure errors but keep running
    if (structureErrors.length > 0) results.push(...structureErrors);

    if (tree?.children && tree.children.length > 0) {
      for (const child of tree.children) {
        if (child.type === "folder") {
          const validateFunc = validationMap[child.name];
          const folderFiles = Array.from(files).filter((file) =>
            file.webkitRelativePath
              .toLowerCase()
              .startsWith(`${tree.name}/${child.name}`.toLowerCase() + "/")
          );

          // ✅ Empty folder — still continue logic
          if (folderFiles.length === 0) {
            results.push({
              folderName: child.name,
              fileName: "N/A",
              errorSpotted: "Folder is empty (skipped but not stopped)",
            });
            continue;
          }

          // ✅ Folder has logic
          if (validateFunc) {
            try {
              const folderResults = await validateFunc(folderFiles);
              results.push(...folderResults);
            } catch (err: any) {
              results.push({
                folderName: child.name,
                fileName: "N/A",
                errorSpotted: `Error running validation: ${err.message}`,
              });
            }
          } else {
            results.push({
              folderName: child.name,
              fileName: "N/A",
              errorSpotted: "No validation logic defined",
            });
          }
        }
      }
    } else {
      results.push({
        folderName: tree.name,
        fileName: "N/A",
        errorSpotted: "No subfolders found",
      });
    }

    // ✅ Always return full result
    return results.length > 0
      ? results
      : [{ folderName: "N/A", fileName: "N/A", errorSpotted: "Nothing to validate" }];
  } catch (error: any) {
    return [
      {
        folderName: "System Error",
        fileName: "N/A",
        errorSpotted: `Validation failed: ${error.message}`,
      },
    ];
  }
};
