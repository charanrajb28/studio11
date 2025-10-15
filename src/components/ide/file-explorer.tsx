
import { File, Folder, ChevronDown, FileJson, FileCode, ChevronRight, FolderPlus, FilePlus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { FileData } from "@/lib/files";
import React, { useState } from "react";
import { Button } from "../ui/button";

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

    const renderTree = (pathPrefix: string = '') => {
        const level = pathPrefix === '' ? 0 : pathPrefix.split('/').filter(p => p).length;
    
        const directChildren = files
            .filter(file => {
                const parentPath = file.path.substring(0, file.path.lastIndexOf('/')) || '/';
                const rootParentPath = file.path.startsWith('/') && !file.path.substring(1).includes('/') ? '/' : parentPath;
                const expectedParentPath = pathPrefix === '' ? '/' : pathPrefix;
                return (pathPrefix === '' && rootParentPath === expectedParentPath) || (parentPath === expectedParentPath);
            })
            .sort((a, b) => {
                if (a.type === 'folder' && b.type === 'file') return -1;
                if (a.type === 'file' && b.type === 'folder') return 1;
                return a.name.localeCompare(b.name);
            });

        return directChildren.map((item) => {
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
                    style={{ paddingLeft: `${level * 1 + 1.75}rem` }}
                    onClick={() => onSelect(item.path)}
                    aria-current={item.path === activeFile ? "page" : undefined}
                >
                     <div className="mr-2 text-muted-foreground">{getIcon(item.type, item.name)}</div>
                    <span className="truncate">{item.name}</span>
                </div>
            );
        });
    }

    return (
        <div className="h-full bg-card text-sm text-foreground/80 flex flex-col" role="navigation">
            <div className="flex items-center justify-between p-2 border-b border-border">
                <h3 className="text-base font-semibold pl-2">Explorer</h3>
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                        <FilePlus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                        <FolderPlus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <ScrollArea className="flex-1 p-2">
                <div role="tree">
                    {renderTree()}
                </div>
            </ScrollArea>
        </div>
    )
}
