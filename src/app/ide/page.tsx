"use client";

import { useState } from "react";
import { Header } from "@/components/ide/header";
import { FileExplorer } from "@/components/ide/file-explorer";
import { CodeEditor } from "@/components/ide/code-editor";
import { Terminal } from "@/components/ide/terminal";
import { Preview } from "@/components/ide/preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { fileData, type FileData } from "@/lib/files";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AISuggestions } from "@/components/ide/ai-suggestions";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

export default function IdePage() {
  const [files, setFiles] = useState<FileData[]>(fileData);
  const [openFiles, setOpenFiles] = useState<string[]>(["/src/app/page.tsx"]);
  const [activeFile, setActiveFile] = useState<string>("/src/app/page.tsx");
  const [selectedPath, setSelectedPath] = useState<string>("/src/app/page.tsx");
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false);

  // ---------- File Explorer Actions ----------
  const handleFileSelect = (path: string) => {
    setSelectedPath(path);
    const file = files.find((f) => f.path === path);
    if (file && file.type === "file") {
      if (!openFiles.includes(path)) {
        setOpenFiles([...openFiles, path]);
      }
      setActiveFile(path);
    }
  };

  const handleCloseFile = (path: string, e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    const newOpenFiles = openFiles.filter((p) => p !== path);
    setOpenFiles(newOpenFiles);
    if (activeFile === path) {
      setActiveFile(newOpenFiles[0] || "");
    }
  };

  const handleNewFile = () => {
    const parentFolder =
      files.find((f) => f.path === selectedPath && f.type === "folder")
        ? selectedPath
        : selectedPath.substring(0, selectedPath.lastIndexOf("/")) || "/";

    const newFileName = prompt("Enter new file name:");
    if (newFileName) {
      const newFilePath =
        parentFolder === "/" ? `/${newFileName}` : `${parentFolder}/${newFileName}`;
      if (files.some((f) => f.path === newFilePath)) {
        alert("A file with that name already exists.");
        return;
      }
      const newFile: FileData = {
        path: newFilePath,
        name: newFileName,
        type: "file",
        content: "",
      };
      setFiles([...files, newFile]);
    }
  };

  const handleNewFolder = () => {
    const parentFolder =
      files.find((f) => f.path === selectedPath && f.type === "folder")
        ? selectedPath
        : selectedPath.substring(0, selectedPath.lastIndexOf("/")) || "/";

    const newFolderName = prompt("Enter new folder name:");
    if (newFolderName) {
      const newFolderPath =
        parentFolder === "/" ? `/${newFolderName}` : `${parentFolder}/${newFolderName}`;
      if (files.some((f) => f.path === newFolderPath)) {
        alert("A folder with that name already exists.");
        return;
      }
      const newFolder: FileData = {
        path: newFolderPath,
        name: newFolderName,
        type: "folder",
      };
      setFiles([...files, newFolder]);
    }
  };

  const handleDelete = () => {
    if (!selectedPath) {
      alert("Please select a file or folder to delete.");
      return;
    }
    if (confirm(`Are you sure you want to delete ${selectedPath}?`)) {
      const isFolder =
        files.find((f) => f.path === selectedPath)?.type === "folder";
      const updatedFiles = files.filter((f) => {
        if (isFolder) return !f.path.startsWith(selectedPath);
        return f.path !== selectedPath;
      });
      setFiles(updatedFiles);

      // Close the deleted file if it was open
      if (!isFolder && openFiles.includes(selectedPath)) {
        handleCloseFile(selectedPath);
      }

      setSelectedPath("/");
    }
  };

  // ---------- Editor State ----------
  const activeFileContent =
    files.find((f) => f.path === activeFile)?.content ?? "";

  const setActiveFileContent = (newContent: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.path === activeFile ? { ...f, content: newContent } : f
      )
    );
  };

  // ---------- Layout ----------
  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main IDE Layout */}
      <div className="flex flex-1 h-full relative">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1 border-t border-border"
        >
          {/* ========== Left: File Explorer ========== */}
          <ResizablePanel
            defaultSize={16}
            minSize={12}
            maxSize={25}
            className="min-w-[220px] border-r border-border bg-muted/30"
          >
            <FileExplorer
              files={files}
              onSelect={handleFileSelect}
              activeFile={activeFile}
              selectedPath={selectedPath}
              onNewFile={handleNewFile}
              onNewFolder={handleNewFolder}
              onDelete={handleDelete}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* ========== Right: Editor + Preview + Terminal ========== */}
          <ResizablePanel defaultSize={84} minSize={50}>
            <ResizablePanelGroup direction="vertical">
              {/* Top Section - Editor + Preview */}
              <ResizablePanel defaultSize={70}>
                <Tabs defaultValue="editor" className="h-full flex flex-col">
                  <TabsList className="border-b bg-muted/40 px-4 py-2 flex gap-4">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>

                  {/* Editor Tab */}
                  <TabsContent
                    value="editor"
                    className="flex-1 overflow-hidden p-2"
                  >
                    {activeFile ? (
                      <CodeEditor
  key={activeFile}
  openFiles={files.filter(f => openFiles.includes(f.path))}
  activeFile={activeFile}
  onSelectFile={handleFileSelect}
  onCloseFile={handleCloseFile}
  code={activeFileContent || ""}
  setCode={setActiveFileContent}
/>

                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No file open
                      </div>
                    )}
                  </TabsContent>

                  {/* Preview Tab */}
                  <TabsContent value="preview" className="flex-1 overflow-auto">
                    <Preview code={activeFileContent} />
                  </TabsContent>
                </Tabs>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Bottom Section - Terminal */}
              <ResizablePanel defaultSize={30} minSize={15}>
                <Terminal />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* ========== AI Assistant Sidebar Button ========== */}
        <Button
          variant="default"
          size="sm"
          className="absolute top-4 right-4 z-50 flex items-center gap-1 shadow-md"
          onClick={() => setIsAISidebarOpen(!isAISidebarOpen)}
        >
          <Wand2 className="w-4 h-4" />
          AI
        </Button>

        {/* ========== AI Sidebar Panel ========== */}
        <div
          className={`fixed top-0 right-0 h-full w-96 bg-card shadow-lg transform transition-transform duration-300 z-40 ${
            isAISidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <AISuggestions />
        </div>

        {/* ========== Dim Overlay When AI Panel Is Open ========== */}
        {isAISidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30"
            onClick={() => setIsAISidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
