"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Code, GitBranch, Search } from "lucide-react";
import { ImportGitDialog } from "./import-git-dialog";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const templates = [
  { name: "Next.js", description: "A feature-rich React framework for production.", id: "template-nextjs" },
  { name: "React", description: "A JavaScript library for building user interfaces.", id: "template-react" },
  { name: "HTML/CSS/JS", description: "The building blocks of the web. Start from scratch.", id: "template-html" },
  { name: "Node.js", description: "A JavaScript runtime for server-side applications.", id: "template-node" },
  { name: "Vue.js", description: "The progressive JavaScript framework.", id: "template-vue" },
  { name: "Angular", description: "A TypeScript-based framework by Google.", id: "template-angular" },
  { name: "Svelte", description: "A compiler that generates minimal JavaScript.", id: "template-svelte" },
  { name: "Python (Flask)", description: "Micro web framework for Python.", id: "template-flask" },
  { name: "Django", description: "A high-level Python web framework.", id: "template-django" },
  { name: "Express.js", description: "Fast, minimalist Node.js web framework.", id: "template-express" },
  { name: "Go (Gin)", description: "A lightweight Go web framework.", id: "template-gin" },
  { name: "Java (Spring Boot)", description: "Java-based framework for microservices.", id: "template-spring" },
  { name: "Rust (Axum)", description: "Build performant web apps with Rust.", id: "template-axum" },
  { name: "PHP (Laravel)", description: "A popular PHP framework for web artisans.", id: "template-laravel" },
  { name: "Ruby on Rails", description: "A web-application framework written in Ruby.", id: "template-rails" },
  { name: "React Native", description: "Build cross-platform apps with React.", id: "template-reactnative" },
  { name: "Tailwind CSS", description: "Utility-first CSS framework for modern designs.", id: "template-tailwind" },
  { name: "Vite", description: "Next generation frontend tooling.", id: "template-vite" },
  { name: "Astro", description: "Build fast websites with less JavaScript.", id: "template-astro" },
  { name: "Electron", description: "Build desktop apps with JavaScript.", id: "template-electron" },
];
const templateImages = placeholderImages.filter((p) =>
  p.id.startsWith("template-")
);

interface TemplateSelectionProps {
  onBack: () => void;
}

export function TemplateSelection({ onBack }: TemplateSelectionProps) {
  const router = useRouter();
  const [isImportGitOpen, setImportGitOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleTemplateClick = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setProjectName("");
    setProjectDescription("");
    setIsModalOpen(true);
  };

  const handleCreateProject = () => {
    if (!projectName.trim()) {
      alert("Project name is required!");
      return;
    }
    // Here you would create the project using API or state
    router.push(`/ide?template=${selectedTemplate?.id}&name=${encodeURIComponent(projectName)}`);
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 h-8 w-8"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Create a new project</h1>
        </div>
        <Button variant="outline" onClick={() => setImportGitOpen(true)}>
          <GitBranch className="mr-2 h-4 w-4" />
          Import from Repository
        </Button>
      </div>

      <p className="text-muted-foreground mb-6 max-w-2xl">
        Choose a template to get started. Your new project will be pre-configured
        with all the necessary files and dependencies.
      </p>

      <ImportGitDialog open={isImportGitOpen} onOpenChange={setImportGitOpen} />

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md ">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground " />
        <Input
          placeholder="Search templates..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => {
            const templateImage = templateImages.find(
              (t) => t.id === template.id
            );
            return (
              <Card
                key={template.name}
                className="flex flex-col hover:border-primary transition-colors cursor-pointer group"
                onClick={() => handleTemplateClick(template)}
              >
                <CardHeader className="flex-row items-start gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-card p-1">
                    {templateImage ? (
                      <Image
                        src={templateImage.imageUrl}
                        alt={template.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    ) : (
                      <Code className="w-8 h-8 text-muted-foreground" />
                    )}
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
          })
        ) : (
          <p className="text-muted-foreground text-sm">
            No templates match your search.
          </p>
        )}
      </div>

      {/* Modal for Project Details */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3">
                {templateImages.find(t => t.id === selectedTemplate.id) ? (
                  <Image
                    src={templateImages.find(t => t.id === selectedTemplate.id)!.imageUrl}
                    alt={selectedTemplate.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <Code className="w-10 h-10 text-muted-foreground" />
                )}
                <span className="font-semibold text-lg">{selectedTemplate.name}</span>
              </div>
              <Input
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <Input
                placeholder="Project Description (optional)"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
          )}
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
