import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import { FolderItem } from "@/utils/folderUtils";

const queryClient = new QueryClient();

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [folderTree, setFolderTree] = useState<FolderItem | null>(null);
  const [validationResults, setValidationResults] = useState<{ folderName: string; fileName: string; errorSpotted: string }[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Index
                    setSelectedFiles={setSelectedFiles}
                    setFolderTree={setFolderTree}
                    folderTree={folderTree}
                    validationResults={validationResults}
                    setValidationResults={setValidationResults}
                  />
                }
              />
              <Route path="/results" element={<Results />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
