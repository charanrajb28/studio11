"use client";

import { Wand2, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "../ui/scroll-area";

export function AISuggestions() {
  return (
    <div className="h-full bg-card text-sm text-foreground/80 flex flex-col">
      <h3 className="text-base font-semibold p-4 border-b border-border flex items-center">
        <Wand2 className="w-5 h-5 mr-2 text-primary" />
        AI Suggestions
      </h3>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <p className="text-muted-foreground">
            Describe the changes you want to make, and the AI will generate code suggestions for you.
          </p>
          <Textarea
            placeholder="e.g., 'Create a blue button with a white border'"
            className="bg-background min-h-[100px]"
          />
          <Button className="w-full">
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Code
          </Button>

          <Card className="bg-background">
            <CardHeader className="p-4 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">Suggestion 1</CardTitle>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                <code>
{`<Button 
  className="bg-blue-500 text-white border-white border-2 hover:bg-blue-600"
>
  Click Me
</Button>`}
                </code>
              </pre>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm">Apply</Button>
                 <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
