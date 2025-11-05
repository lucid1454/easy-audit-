// /src/types.d.ts
interface FileSystemHandle {}
interface FileSystemFileHandle extends FileSystemHandle {
  getFile(): Promise<File>;
}
interface FileSystemDirectoryHandle extends FileSystemHandle {
  values(): AsyncIterable<FileSystemHandle>;
}
interface Window {
  showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
}

// Extend React types to allow non-standard attributes used for directory uploads
declare namespace React {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string | boolean;
    directory?: string | boolean;
    mozdirectory?: string | boolean;
    msdirectory?: string | boolean;
  }
}