
"use client"

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import type { Dispatch, SetStateAction } from 'react';
import type { FileData } from '@/lib/files';

interface CodeEditorProps {
    openFiles: FileData[];
    activeFile: string;
    onSelectFile: (path: string) => void;
    onCloseFile: (path: string, e: React.MouseEvent) => void;
    code: string;
    setCode: (code: string) => void;
}


export function CodeEditor({ openFiles, activeFile, onSelectFile, onCloseFile, code, setCode }: CodeEditorProps) {
    return (
        <div className="h-full flex flex-col bg-card">
            <div className="flex-shrink-0 border-b border-border">
                <ScrollArea orientation="horizontal" className="h-10">
                    <div className="flex items-center h-10">
                        {openFiles.map(file => (
                            <div key={file.path}
                                onClick={() => onSelectFile(file.path)}
                                className={cn(
                                    "flex items-center h-full px-4 text-sm border-r border-border cursor-pointer whitespace-nowrap",
                                    file.path === activeFile ? "bg-background text-foreground" : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                                )}>
                                <span>{file.name}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 rounded-full hover:bg-accent/20" onClick={(e) => onCloseFile(file.path, e)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <div className="flex-1 relative">
                <ScrollArea className="absolute inset-0">
                    <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="h-full w-full resize-none border-none rounded-none bg-background font-code text-base p-4 focus-visible:ring-0"
                        placeholder="Select a file to start editing..."
                        aria-label="Code Editor"
                    />
                </ScrollArea>
            </div>
        </div>
    );
}
