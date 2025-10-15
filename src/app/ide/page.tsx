"use client";

import { useState } from 'react';
import { Header } from '@/components/ide/header';
import { FileExplorer } from '@/components/ide/file-explorer';
import { CodeEditor } from '@/components/ide/code-editor';
import { Terminal } from '@/components/ide/terminal';
import { Preview } from '@/components/ide/preview';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function IdePage() {
    const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodePod Preview</title>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #ffffff; color: #111827; padding: 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 90vh; text-align: center; }
        h1 { color: #64B5F6; font-family: 'Inter', sans-serif; font-weight: 700; }
        p { font-size: 1.1rem; }
        button { background-color: #BA68C8; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: transform 0.2s; }
        button:hover { transform: scale(1.05); }
    </style>
</head>
<body>
    <h1>Welcome to CodePod!</h1>
    <p>This is a live preview of your code.</p>
    <button id="counter">Click me: 0</button>
    <script>
        const button = document.getElementById('counter');
        let count = 0;
        button.addEventListener('click', () => {
            count++;
            button.textContent = 'Click me: ' + count;
        });
    </script>
</body>
</html>`;

  const [code, setCode] = useState(defaultHtml);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body">
      <Header />
      <ResizablePanelGroup direction="horizontal" className="flex-1 w-full border-t border-border">
        <ResizablePanel defaultSize={15} minSize={12} maxSize={25} className="min-w-[200px]">
          <FileExplorer />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60} minSize={20}>
              <CodeEditor code={code} setCode={setCode} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40} minSize={15}>
               <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={50} minSize={20}>
                      <Terminal />
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50} minSize={20}>
                      <Preview code={code} />
                  </ResizablePanel>
               </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
