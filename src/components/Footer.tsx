import { useState } from "react";
import { Linkedin, Github, Mail, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FolderTreeDisplay } from "@/components/ui/FolderTreeDisplay";
import { FolderItem } from "@/utils/folderUtils";

interface FooterProps {
  folderTree: FolderItem | null;
}

export const Footer = ({ folderTree }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const [isTreeDialogOpen, setIsTreeDialogOpen] = useState(false);

  return (
    <footer id="contact" className="bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* Tree View Button */}
          <div className="flex justify-center">
            <Dialog open={isTreeDialogOpen} onOpenChange={setIsTreeDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 bg-foreground/10 text-foreground hover:bg-accent hover:text-accent-foreground border-foreground/20"
                >
                  <FolderTree className="w-4 h-4" />
                  View Folder Tree
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle>Folder Tree View</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto max-h-[60vh]">
                  <FolderTreeDisplay tree={folderTree} />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm opacity-90">
                © {currentYear} Easy Audit | SolidPro Engineering Support Pvt. Ltd.
              </p>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap justify-center gap-6">
              <a
                href="#home"
                className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-smooth"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-smooth"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-smooth"
              >
                Contact
              </a>
              <a
                href="#privacy"
                className="text-sm opacity-90 hover:opacity-100 hover:text-primary transition-smooth"
              >
                Privacy Policy
              </a>
            </nav>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-accent transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-accent transition-smooth"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@easyaudit.com"
                className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-accent transition-smooth"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
