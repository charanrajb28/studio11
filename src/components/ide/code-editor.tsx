"use client"

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FileData } from '@/lib/files';
import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
    openFiles: FileData[];
    activeFile: string;
    onSelectFile: (path: string) => void;
    onCloseFile: (path: string, e: React.MouseEvent) => void;
    code: string;
    setCode: (code: string) => void;
}

const extensionToLanguage: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    jsx: 'javascript',
    tsx: 'typescript',
    java: 'java',
    py: 'python',
    html: 'html',
    htm: 'html',
    css: 'css',
    scss: 'scss',
    less: 'less',
    json: 'json',
    jsonc: 'json',
    cpp: 'cpp',
    cxx: 'cpp',
    cc: 'cpp',
    c: 'c',
    h: 'cpp',
    go: 'go',
    php: 'php',
    rb: 'ruby',
    rs: 'rust',
    kt: 'kotlin',
    kts: 'kotlin',
    swift: 'swift',
    dart: 'dart',
    lua: 'lua',
    sh: 'shell',
    bash: 'shell',
    zsh: 'shell',
    tsql: 'sql',
    sql: 'sql',
    md: 'markdown',
    markdown: 'markdown',
    yaml: 'yaml',
    yml: 'yaml',
    xml: 'xml',
    vue: 'vue',
    r: 'r',
    perl: 'perl',
    json5: 'json',
    txt: 'plaintext',
    ini: 'ini',
    dockerfile: 'dockerfile',
    // add more if needed
};

function getLanguageFromFileName(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (!ext) return 'plaintext';
    return extensionToLanguage[ext] || 'plaintext';
}

export function CodeEditor({ openFiles, activeFile, onSelectFile, onCloseFile, code, setCode }: CodeEditorProps) {
    return (
        <div className="flex flex-col bg-card h-full">
            {/* Tabs */}
            <div className="flex-shrink-0 border-b border-border overflow-x-auto">
                <div className="flex items-center h-10 min-w-max">
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
            </div>

            {/* Editor */}
            <div className="flex-1 relative">
                <MonacoEditor
                    height="100%"
                    width="100%"
                    language={getLanguageFromFileName(activeFile)}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        automaticLayout: true,
                    }}
                />
            </div>
        </div>
    );
}
