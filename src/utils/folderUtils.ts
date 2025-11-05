export interface FolderItem {
  name: string;
  type: 'folder' | 'file';
  children?: FolderItem[];
  path?: string;
}

export const processFolder = async (selectedFolderName: string): Promise<FolderItem | null> => {
  const input = document.querySelector('input[type="file"]') as HTMLInputElement | null;
  if (input && input.files) {
    const files = Array.from(input.files);
    if (files.length > 0) {
      const root: FolderItem = { name: selectedFolderName, type: 'folder', children: [] };
      files.forEach(file => {
        const parts = file.webkitRelativePath.split('/');
        if (parts[0] === selectedFolderName) {
          parts.shift(); // Remove the selected folder name from the path
        }
        let current = root;
        parts.forEach((part, index) => {
          if (index === parts.length - 1) {
            current.children?.push({ name: part, type: 'file', path: file.webkitRelativePath });
          } else {
            let folder = current.children?.find(child => child.name === part && child.type === 'folder');
            if (!folder) {
              folder = { name: part, type: 'folder', children: [] };
              current.children?.push(folder);
            }
            current = folder;
          }
        });
      });

      // Add missing expected subfolders as empty
      const rootFolders = root.children?.filter(child => child.type === 'folder') || [];
      expectedSubfolders.forEach(expected => {
        if (!rootFolders.find(f => f.name === expected)) {
          root.children?.push({ name: expected, type: 'folder', children: [] });
        }
      });

      return root;
    }
  }
  return null;
};

const expectedSubfolders = [
  '01. PROPOSAL DOCUMENT',
  '02. REQUIREMENT_CONSOLIDATED DESIGN DOCUMENT',
  '03. PROJECT PLAN',
  '04. SCHEDULE, METRICS & PERFORMANCE REPORT',
  '05. TEST CASE REPORT',
  '06. CUSTOMER REPORTED ISSUE',
  '07. RELEASE DOCUMENT',
  '08. CUSTOMER FEEDBACK REPORT',
  '09. PROJECT CLOSURE REPORT',
  '10. MOM',
  '11. WEEKLY STATUS REPORT'
];

export const validateFolderStructure = (tree: FolderItem | null): { folderName: string; fileName: string; errorSpotted: string }[] => {
  const results: { folderName: string; fileName: string; errorSpotted: string }[] = [];

  if (!tree || !tree.children) {
    results.push({ folderName: tree?.name || 'Unknown', fileName: 'N/A', errorSpotted: 'No folder structure found. Please select a valid project folder.' });
    return results;
  }

  const rootFolders = tree.children.filter(child => child.type === 'folder');

  // Check if there are at least 11 subfolders
  if (rootFolders.length < 11) {
    results.push({ folderName: tree.name, fileName: 'N/A', errorSpotted: 'The folder is not complete. It must contain at least 11 subfolders.' });
    return results; // Stop here if not enough subfolders
  }

  const reportedMismatchFolders = new Set<string>();
  const mismatchedExpected = new Set<string>();

  // Check for name mismatches and missing expected subfolders
  expectedSubfolders.forEach(expected => {
    const folder = rootFolders.find(f => f.name === expected);
    if (!folder) {
      // Check for name mismatch (specific for 11th subfolder)
      if (expected === '11. WEEKLY STATUS REPORT') {
        const mismatchFolder = rootFolders.find(f => f.name.startsWith('11.') && f.name.includes('WEEKLY STATUS'));
        if (mismatchFolder) {
          results.push({ folderName: expected, fileName: 'N/A', errorSpotted: `Name mismatch: Found '${mismatchFolder.name}' instead of '${expected}'` });
          reportedMismatchFolders.add(mismatchFolder.name);
          mismatchedExpected.add(expected);
        } else {
          results.push({ folderName: expected, fileName: 'N/A', errorSpotted: `Subfolder '${expected}' is missing.` });
        }
      } else {
        results.push({ folderName: expected, fileName: 'N/A', errorSpotted: `Subfolder '${expected}' is missing.` });
      }
    }
  });

  // Check for general name mismatches (not just 11th)
  rootFolders.forEach(folder => {
    if (!expectedSubfolders.includes(folder.name)) {
      // Find the closest match or specific mismatch
      const closestMatch = expectedSubfolders.find(expected => expected.startsWith(folder.name.split('.')[0] + '.'));
      if (closestMatch) {
        results.push({ folderName: closestMatch, fileName: 'N/A', errorSpotted: `Name mismatch: Found '${folder.name}' instead of '${closestMatch}'` });
        reportedMismatchFolders.add(folder.name);
        mismatchedExpected.add(closestMatch);
      } else {
        results.push({ folderName: folder.name, fileName: 'N/A', errorSpotted: `Unexpected subfolder: '${folder.name}'` });
      }
    }
  });

  // Check for empty subfolders among the expected ones (exclude if name mismatch)
  expectedSubfolders.forEach(expected => {
    if (mismatchedExpected.has(expected)) return; // Skip if name mismatch for this expected
    const folder = rootFolders.find(f => f.name === expected);
    if (folder) {
      const isEmpty = !folder.children || folder.children.length === 0;
      if (isEmpty) {
        results.push({ folderName: expected, fileName: 'N/A', errorSpotted: `The '${expected}' subfolder is empty.` });
      }
    }
  });

  // Check for extra subfolders (excluding reported mismatches)
  const extraFolders = rootFolders.filter(folder => !expectedSubfolders.includes(folder.name) && !reportedMismatchFolders.has(folder.name));
  if (extraFolders.length > 0) {
    results.push({ folderName: tree.name, fileName: 'N/A', errorSpotted: `Extra subfolders found: ${extraFolders.map(f => f.name).join(', ')}` });
  }

  return results;
};
