/*import { FolderItem } from '@/utils/folderUtils';
import { useState } from 'react';

interface FolderTreeProps {
  item: FolderItem;
  depth?: number;
}

export function FolderTreeDisplay({ item, depth = 0 }: FolderTreeProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.type === 'file') {
    return (
      <li className={`ml-${depth * 4} text-sm text-gray-700 dark:text-gray-300`}>
        📄 {item.name}
      </li>
    );
  }

  return (
    <li className={`ml-${depth * 4}`}>
      <div
        className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        📁 {item.name}
      </div>
      {item.children && item.children.length > 0 && isOpen && (
        <ul className="ml-4 list-none">
          {item.children.map((child, index) => (
            <FolderTreeDisplay key={index} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}*/





import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, File, FolderOpen } from "lucide-react";
import { FolderItem } from "@/utils/folderUtils";
import { Card } from "@/components/ui/card";

interface FolderTreeDisplayProps {
  tree: FolderItem | null;
}

export const FolderTreeDisplay = ({ tree }: FolderTreeDisplayProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderTree = (item: FolderItem, path: string = "", level: number = 0) => {
    const currentPath = path ? `${path}/${item.name}` : item.name;
    const isExpanded = expandedFolders.has(currentPath);
    const hasChildren = item.children && item.children.length > 0;
    const isEmpty = item.type === 'folder' && (!item.children || item.children.length === 0);

    return (
      <div key={currentPath} className="select-none">
        <div
          className={`flex items-center gap-2 py-1.5 px-2 hover:bg-accent/50 rounded-md cursor-pointer transition-colors`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => item.type === 'folder' && toggleFolder(currentPath)}
        >
          {item.type === 'folder' ? (
            <>
              {hasChildren ? (
                isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )
              ) : (
                <span className="w-4 h-4 flex-shrink-0" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 text-primary flex-shrink-0" />
              ) : (
                <Folder className="w-4 h-4 text-primary flex-shrink-0" />
              )}
              <span className="text-sm font-medium text-foreground">
                {item.name}
                {isEmpty && <span className="text-muted-foreground ml-2">(empty)</span>}
              </span>
            </>
          ) : (
            <>
              <span className="w-4 h-4 flex-shrink-0" />
              <File className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-foreground">{item.name}</span>
            </>
          )}
        </div>
        {item.type === 'folder' && isExpanded && hasChildren && (
          <div>
            {item.children!.map((child) => renderTree(child, currentPath, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!tree) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No folder selected. Please select a folder to view its structure.</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 max-h-[600px] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Folder Structure</h3>
      <div className="space-y-1">
        {tree.children && tree.children.length > 0 ? (
          tree.children.map((child) => renderTree(child, "", 0))
        ) : (
          <p className="text-muted-foreground text-sm px-2">This folder is empty</p>
        )}
      </div>
    </Card>
  );
};
