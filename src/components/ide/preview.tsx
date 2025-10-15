"use client"

import { ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "../ui/button"

interface PreviewProps {
    code: string;
}

export function Preview({ code }: PreviewProps) {
    return (
        <div className="h-full flex flex-col bg-card">
            <div className="flex-shrink-0 flex items-center justify-between h-10 px-2 border-b border-border">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex-1 px-2">
                    <div className="text-sm bg-background border rounded-md px-2 py-1 text-muted-foreground">
                        localhost:3000
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ExternalLink className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex-1 bg-white">
                <iframe
                    srcDoc={code}
                    title="Live Preview"
                    sandbox="allow-scripts allow-same-origin"
                    className="w-full h-full border-0"
                />
            </div>
        </div>
    )
}
