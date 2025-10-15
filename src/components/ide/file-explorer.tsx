import { File, Folder, ChevronDown, FileJson, FileCode } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const fileStructure = [
    { name: 'public', type: 'folder', level: 0, icon: <Folder className="w-4 h-4" /> },
    { name: 'favicon.ico', type: 'file', level: 1, icon: <File className="w-4 h-4" /> },
    { name: 'src', type: 'folder', level: 0, icon: <Folder className="w-4 h-4" /> },
    { name: 'app', type: 'folder', level: 1, icon: <Folder className="w-4 h-4" /> },
    { name: 'page.tsx', type: 'file', level: 2, icon: <FileCode className="w-4 h-4" /> },
    { name: 'layout.tsx', type: 'file', level: 2, icon: <FileCode className="w-4 h-4" /> },
    { name: 'index.html', type: 'file', level: 0, active: true, icon: <FileCode className="w-4 h-4" /> },
    { name: 'styles.css', type: 'file', level: 0, icon: <FileCode className="w-4 h-4" /> },
    { name: 'script.js', type: 'file', level: 0, icon: <FileCode className="w-4 h-4" /> },
    { name: 'package.json', type: 'file', level: 0, icon: <FileJson className="w-4 h-4" /> },
];

export function FileExplorer() {
    return (
        <div className="h-full bg-card text-sm text-foreground/80 flex flex-col" role="navigation">
            <h3 className="text-base font-semibold p-4 border-b border-border">Explorer</h3>
            <ScrollArea className="flex-1 p-2">
                <div role="tree">
                    {fileStructure.map((item) => (
                        <div key={item.name}
                            className={cn(
                                "flex items-center h-7 rounded-md cursor-pointer pr-2",
                                item.active ? "bg-accent/30 text-accent-foreground" : "hover:bg-accent/10"
                            )}
                            style={{ paddingLeft: `${item.level * 1 + 0.5}rem` }}
                            aria-current={item.active ? "page" : undefined}
                        >
                            <div className="flex items-center flex-shrink-0">
                                {item.type === 'folder' && <ChevronDown className="w-4 h-4 mr-1 opacity-60" />}
                                {item.type === 'file' && <div className="w-4 mr-1" />}
                                <div className="mr-2 text-muted-foreground">{item.icon}</div>
                            </div>
                            <span className="truncate">{item.name}</span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}
