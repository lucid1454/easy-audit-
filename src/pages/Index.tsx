import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { WhoWeAreSection } from "@/components/WhoWeAreSection";
import { ISOComplianceSection } from "@/components/ISOComplianceSection";
import { Footer } from "@/components/Footer";
import { FolderItem } from "@/utils/folderUtils";

interface IndexProps {
  setSelectedFiles: (files: FileList | null) => void;
  setFolderTree: (tree: FolderItem | null) => void;
  folderTree: FolderItem | null;
  validationResults: { folderName: string; fileName: string; errorSpotted: string }[];
  setValidationResults: (results: { folderName: string; fileName: string; errorSpotted: string }[]) => void;
}

const Index = ({ setSelectedFiles, setFolderTree, folderTree, validationResults, setValidationResults }: IndexProps) => {
  return (
    <main>
      <Header />
      <HeroSection
        setSelectedFiles={setSelectedFiles}
        setFolderTree={setFolderTree}
        validationResults={validationResults}
        setValidationResults={setValidationResults}
      />
      <WhoWeAreSection />
      <ISOComplianceSection />
      <Footer folderTree={folderTree} />
    </main>
  );
};

export default Index;
