"use client";

import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useRef, useEffect, KeyboardEvent } from "react";

type TerminalLine = {
    type: 'input' | 'output';
    content: string;
};

const initialLines: TerminalLine[] = [
    { type: 'output', content: 'Welcome to CodePod terminal.' },
    { type: 'input', content: 'npm run dev' },
    { type: 'output', content: '> my-first-project@0.0.1 dev' },
    { type: 'output', content: '> next dev' },
    { type: 'output', content: 'ready - started server on 0.0.0.0:3000, url: http://localhost:3000' },
    { type: 'output', content: 'event - compiled client and server successfully in 298 ms (187 modules)' },
];

const Prompt = () => (
    <div className="flex items-center gap-2">
        <span className="text-accent">~/my-first-project</span>
        <span className="text-primary">$</span>
    </div>
);

export function Terminal() {
    const [lines, setLines] = useState<TerminalLine[]>(initialLines);
    const [input, setInput] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [lines]);

    const handleCommand = (command: string) => {
        const newLines: TerminalLine[] = [...lines, { type: 'input', content: command }];
        let output = '';

        switch (command.toLowerCase().trim()) {
            case 'help':
                output = 'Available commands: help, clear, ls, date';
                break;
            case 'clear':
                setLines([]);
                return;
            case 'ls':
                output = 'public   src   package.json   README.md';
                break;
            case 'date':
                output = new Date().toString();
                break;
            case '':
                break;
            default:
                output = `command not found: ${command}`;
        }
        if (output) {
            newLines.push({ type: 'output', content: output });
        }
        setLines(newLines);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div className="h-full flex flex-col bg-card" onClick={() => document.getElementById('terminal-input')?.focus()}>
            <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="font-code text-sm p-4" data-testid="terminal-content">
                    {lines.map((line, index) => (
                        <div key={index}>
                            {line.type === 'input' ? (
                                <div className="flex items-center gap-2 mt-2">
                                    <Prompt />
                                    <span>{line.content}</span>
                                </div>
                            ) : (
                                <div className="text-muted-foreground">{line.content}</div>
                            )}
                        </div>
                    ))}

                    <div className="flex items-center gap-2 mt-2">
                        <Prompt />
                        <input
                            id="terminal-input"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none text-foreground focus:outline-none flex-1"
                            autoComplete="off"
                        />
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
