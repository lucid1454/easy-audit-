import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { runValidation } from "@/logic/validationDispatcher";
import { processFolder, FolderItem, validateFolderStructure } from "@/utils/folderUtils";

interface HeroSectionProps {
  setSelectedFiles: (files: FileList | null) => void;
  setFolderTree: (tree: FolderItem | null) => void;
  validationResults: { folderName: string; fileName: string; errorSpotted: string }[];
  setValidationResults: (results: { folderName: string; fileName: string; errorSpotted: string }[]) => void;
}

export const HeroSection = ({ setSelectedFiles, setFolderTree, validationResults, setValidationResults }: HeroSectionProps) => {
  const [folderPath, setFolderPath] = useState("");
  const [selectedFiles, setLocalSelectedFiles] = useState<FileList | null>(null);
  const [validationLoading, setValidationLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleBrowseFolder = () => {
    fileInputRef.current?.click();
  };

  const handleFolderSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const path = files[0].webkitRelativePath.split('/')[0] || files[0].name;
      setFolderPath(path);
      setLocalSelectedFiles(files);
      setSelectedFiles(files);

      // Build and store folder tree
      const tree = await processFolder(path);
      setFolderTree(tree);

      // Validate structure immediately on selection
      if (tree) {
        const structureErrors = validateFolderStructure(tree);
        if (structureErrors.length > 0) {
          setValidationResults(structureErrors);
        } else {
          setValidationResults([]); // Clear any previous errors if structure is valid
        }
      }
    }
  };

  const handleRunValidation = async () => {
    if (selectedFiles && selectedFiles.length > 0) {
      setValidationLoading(true);
      try {
        const tree = await processFolder(folderPath);
        if (tree) {
          const results = await runValidation(tree, selectedFiles);
          setValidationResults(results);
          // Navigate to results page with state
          navigate('/results', {
            state: {
              validationResults: results,
              projectName: folderPath
            }
          });
        } else {
          const errorResult = [{ folderName: 'N/A', fileName: 'N/A', errorSpotted: 'Folder selection failed. Please select a valid folder.' }];
          setValidationResults(errorResult);
          navigate('/results', {
            state: {
              validationResults: errorResult,
              projectName: folderPath
            }
          });
        }
      } catch (error) {
        const errorResult = [{ folderName: 'System Error', fileName: 'N/A', errorSpotted: `An unexpected error occurred: ${error.message}` }];
        setValidationResults(errorResult);
        navigate('/results', {
          state: {
            validationResults: errorResult,
              projectName: folderPath
            }
          });
      }
      setValidationLoading(false);
    }
  };

  const handleReset = () => {
    setFolderPath('');
    setLocalSelectedFiles(null);
    setSelectedFiles(null);
    setFolderTree(null);
    setValidationResults([]);
    setValidationLoading(false);
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Easy Audit</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-2xl md:text-3xl font-semibold text-foreground mb-3">Audit Right. Audit Easy.</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg md:text-xl text-muted-foreground mb-12">Simplify your folder validation process with smart automation.</motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <Card className="p-8 shadow-soft backdrop-blur-sm bg-card/80 border-border/50">
              <input
                ref={fileInputRef}
                type="file"
                // @ts-ignore - webkitdirectory is not in the TS types
                webkitdirectory=""
                directory=""
                multiple
                onChange={handleFolderSelect}
                className="hidden"
              />
              <div className="space-y-6">
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-foreground text-left">Folder Path</label>
                  <div className="flex gap-3">
                    <Input
                      value={folderPath}
                      readOnly
                      placeholder="No folder selected"
                      className="flex-1 bg-background border-border"
                    />
                    <Button
                      onClick={handleBrowseFolder}
                      variant="outline"
                      className="gap-2 hover:bg-primary hover:text-primary-foreground transition-smooth"
                    >
                      <FolderOpen className="w-4 h-4" /> Browse Folder
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="gap-2 hover:bg-destructive hover:text-destructive-foreground transition-smooth"
                    >
                      Reset
                    </Button>
                  </div>
                  <Button
                    onClick={handleRunValidation}
                    disabled={!folderPath}
                    className="gap-2 gradient-primary hover:opacity-90 transition-smooth text-primary-foreground"
                  >
                    Run Validation
                  </Button>
                </div>
                {validationLoading && <p className="text-center">Validating...</p>}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
