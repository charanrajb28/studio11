"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, GitBranch } from "lucide-react";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImportGitDialog } from "./import-git-dialog";
import { useState } from "react";

const templates = [
    {
        name: "Next.js",
        description: "A feature-rich React framework for production.",
        id: "template-nextjs"
    },
    {
        name: "React",
        description: "A JavaScript library for building user interfaces.",
        id: "template-react"
    },
    {
        name: "HTML/CSS/JS",
        description: "The building blocks of the web. Start from scratch.",
        id: "template-html"
    },
    {
        name: "Node.js",
        description: "A JavaScript runtime for server-side applications.",
        id: "template-node"
    },
    {
        name: "Vue.js",
        description: "The progressive JavaScript framework.",
        id: "template-vue"
    },
    {
        name: "Svelte",
        description: "Cybernetically enhanced web apps.",
        id: "template-svelte"
    },
];

const templateImages = placeholderImages.filter(p => p.id.startsWith("template-"));

interface TemplateSelectionProps {
    onBack: () => void;
}

export function TemplateSelection({ onBack }: TemplateSelectionProps) {
    const router = useRouter();
    const [isImportGitOpen, setImportGitOpen] = useState(false);

    const handleCreateProject = () => {
        // Here you would typically handle the project creation logic
        // and then redirect to the new project's IDE page.
        router.push('/ide');
    };

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
                <Button variant="ghost" size="icon" className="mr-2 h-8 w-8" onClick={onBack}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold">Create a new project</h1>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
                Choose a template to get started. Your new project will be pre-configured with all the necessary files and dependencies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <Card className="flex flex-col hover:border-accent transition-colors cursor-pointer group" onClick={() => setImportGitOpen(true)}>
                    <CardHeader className="flex-row items-start gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-card">
                            <GitBranch className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Import from Git</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>Use an existing repository from GitHub, GitLab, or Bitbucket.</CardDescription>
                    </CardContent>
                </Card>
                <ImportGitDialog open={isImportGitOpen} onOpenChange={setImportGitOpen} />

                {templates.map((template) => {
                    const templateImage = templateImages.find(t => t.id === template.id);
                    return (
                        <Card key={template.name} className="flex flex-col hover:border-primary transition-colors cursor-pointer group" onClick={handleCreateProject}>
                            <CardHeader className="flex-row items-start gap-4">
                                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-card p-1">
                                    {templateImage ? 
                                        <Image src={templateImage.imageUrl} alt={template.name} width={40} height={40} data-ai-hint={templateImage.imageHint} className="object-contain" /> :
                                        <Code className="w-8 h-8 text-muted-foreground" />
                                    }
                                </div>
                                <div>
                                    <CardTitle className="text-lg">{template.name}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>{template.description}</CardDescription>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}