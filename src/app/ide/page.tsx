
"use client";

import { useState } from 'react';
import { Header } from '@/components/ide/header';
import { FileExplorer } from '@/components/ide/file-explorer';
import { CodeEditor } from '@/components/ide/code-editor';
import { Terminal } from '@/components/ide/terminal';
import { Preview } from '@/components/ide/preview';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { fileData, type FileData } from '@/lib/files';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export default function IdePage() {
    const [files, setFiles] = useState<FileData[]>(fileData);
    const [openFiles, setOpenFiles] = useState<string[]>(['/src/app/page.tsx']);
    const [activeFile, setActiveFile] = useState<string>('/src/app/page.tsx');

    const handleFileSelect = (path: string) => {
        const file = files.find(f => f.path === path);
        if (file && file.type === 'file') {
            if (!openFiles.includes(path)) {
                setOpenFiles([...openFiles, path]);
            }
            setActiveFile(path);
        }
    };

    const handleCloseFile = (path: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newOpenFiles = openFiles.filter(p => p !== path);
        setOpenFiles(newOpenFiles);
        if (activeFile === path) {
            setActiveFile(newOpenFiles[0] || '');
        }
    };

    const activeFileContent = files.find(f => f.path === activeFile)?.content || '';
    const setActiveFileContent = (newContent: string) => {
        setFiles(files.map(f => f.path === activeFile ? { ...f, content: newContent } : f));
    }

    return (
        <div className="flex flex-col h-screen bg-background text-foreground font-body">
            <Header />
            <ResizablePanelGroup direction="horizontal" className="flex-1 w-full border-t border-border">
                <ResizablePanel defaultSize={15} minSize={12} maxSize={25} className="min-w-[200px]">
                    <FileExplorer files={files} onSelect={handleFileSelect} activeFile={activeFile} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={85}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={125} >
                            <CodeEditor
                                openFiles={openFiles.map(path => files.find(f => f.path === path)!).filter(Boolean)}
                                activeFile={activeFile}
                                onSelectFile={setActiveFile}
                                onCloseFile={handleCloseFile}
                                code={activeFileContent}
                                setCode={setActiveFileContent}
                            />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={25} minSize={15}>
                            <Tabs defaultValue="terminal" className="h-full flex flex-col">
                                <TabsList className="flex-shrink-0 justify-start rounded-none bg-card border-b border-border h-10 px-2">
                                    <TabsTrigger value="terminal">Terminal</TabsTrigger>
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                </TabsList>
                                <TabsContent value="terminal" className="flex-1 overflow-auto mt-0">
                                    <Terminal />
                                </TabsContent>
                                <TabsContent value="preview" className="flex-1 overflow-auto mt-0">
                                    <Preview code={files.find(f => f.path === '/public/index.html')?.content || ''} />
                                </TabsContent>
                            </Tabs>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
