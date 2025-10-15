
import { File, Folder, ChevronDown, FileJson, FileCode, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { FileData } from "@/lib/files";
import React, { useState } from "react";

interface FileExplorerProps {
    files: FileData[];
    onSelect: (path: string) => void;
    activeFile: string;
}

const getIcon = (type: 'file' | 'folder', name: string) => {
    if (type === 'folder') {
        return <Folder className="w-4 h-4" />;
    }
    if (name.endsWith('.tsx') || name.endsWith('.jsx')) {
        return <FileCode className="w-4 h-4 text-blue-400" />;
    }
    if (name.endsWith('.json')) {
        return <FileJson className="w-4 h-4 text-yellow-400" />;
    }
    if (name.endsWith('.css')) {
        return <FileCode className="w-4 h-4 text-purple-400" />;
    }
    if (name.endsWith('.html')) {
        return <FileCode className="w-4 h-4 text-orange-400" />;
    }
    return <File className="w-4 h-4" />;
}

export function FileExplorer({ files, onSelect, activeFile }: FileExplorerProps) {
    const [openFolders, setOpenFolders] = useState<string[]>(['/', '/src', '/src/app', '/public']);

    const toggleFolder = (path: string) => {
        setOpenFolders(prev => prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]);
    }

    const renderTree = (pathPrefix: string = '/') => {
        const level = pathPrefix === '/' ? 0 : pathPrefix.split('/').length - 1;
        
        return files
            .filter(file => file.path.startsWith(pathPrefix) && file.path.split('/').length === level + 2)
            .sort((a,b) => a.type === 'folder' ? -1 : 1)
            .map((item) => {
                const isFolderOpen = openFolders.includes(item.path);
                if (item.type === 'folder') {
                    return (
                        <React.Fragment key={item.path}>
                            <div
                                className="flex items-center h-7 rounded-md cursor-pointer pr-2 hover:bg-accent/10"
                                style={{ paddingLeft: `${level * 1 + 0.5}rem` }}
                                onClick={() => toggleFolder(item.path)}
                            >
                                <div className="flex items-center flex-shrink-0">
                                    {isFolderOpen ? <ChevronDown className="w-4 h-4 mr-1 opacity-60" /> : <ChevronRight className="w-4 h-4 mr-1 opacity-60" />}
                                    <div className="mr-2 text-muted-foreground">{getIcon(item.type, item.name)}</div>
                                </div>
                                <span className="truncate">{item.name}</span>
                            </div>
                            {isFolderOpen && renderTree(item.path)}
                        </React.Fragment>
                    );
                }
                return (
                    <div key={item.path}
                        className={cn(
                            "flex items-center h-7 rounded-md cursor-pointer pr-2",
                            item.path === activeFile ? "bg-accent/30 text-accent-foreground" : "hover:bg-accent/10"
                        )}
                        style={{ paddingLeft: `${level * 1 + 0.5}rem` }}
                        onClick={() => onSelect(item.path)}
                        aria-current={item.path === activeFile ? "page" : undefined}
                    >
                        <div className="flex items-center flex-shrink-0">
                            <div className="w-4 mr-1" />
                            <div className="mr-2 text-muted-foreground">{getIcon(item.type, item.name)}</div>
                        </div>
                        <span className="truncate">{item.name}</span>
                    </div>
                );
            });
    }

    return (
        <div className="h-full bg-card text-sm text-foreground/80 flex flex-col" role="navigation">
            <h3 className="text-base font-semibold p-4 border-b border-border">Explorer</h3>
            <ScrollArea className="flex-1 p-2">
                <div role="tree">
                    {renderTree()}
                </div>
            </ScrollArea>
        </div>
    )
}
