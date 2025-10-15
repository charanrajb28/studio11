
import { ScrollArea } from "@/components/ui/scroll-area"

export function Terminal() {
    return (
        <div className="h-full flex flex-col bg-card">
            <ScrollArea className="h-full">
                <div className="font-code text-sm p-4" data-testid="terminal-content">
                    <div className="text-muted-foreground">Welcome to CodePod terminal.</div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-accent">~/my-first-project</span>
                        <span className="text-primary">$</span>
                        <span className="flex-1 ml-1">npm run dev</span>
                    </div>
                    <div className="text-muted-foreground">
                        <p>&gt; my-first-project@0.0.1 dev</p>
                        <p>&gt; next dev</p>
                    </div>
                    <div className="mt-2">
                        <p><span className="text-primary">ready</span> - started server on 0.0.0.0:3000, url: http://localhost:3000</p>
                        <p><span className="text-primary">event</span> - compiled client and server successfully in 298 ms (187 modules)</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <span className="text-accent">~/my-first-project</span>
                        <span className="text-primary">$</span>
                        <div className="w-2 h-4 ml-1 bg-foreground animate-pulse" />
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
