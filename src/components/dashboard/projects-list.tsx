import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { Plus, Workflow, Code, Star, GitFork, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projectTemplates = placeholderImages.filter(p => p.id.startsWith("template-"));

const projects = [
    {
        name: "My First Project",
        template: "Next.js",
        lastUpdated: "2 hours ago",
        stats: { stars: 12, forks: 3 },
        templateId: "template-nextjs"
    },
    {
        name: "React Playground",
        template: "React",
        lastUpdated: "1 day ago",
        stats: { stars: 5, forks: 1 },
        templateId: "template-react"
    },
    {
        name: "Portfolio Site",
        template: "HTML/CSS/JS",
        lastUpdated: "3 days ago",
        stats: { stars: 23, forks: 8 },
        templateId: "template-html"
    },
];

interface ProjectsListProps {
    onNewProject: () => void;
}

export function ProjectsList({ onNewProject }: ProjectsListProps) {
    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">My Projects</h1>
                <Button onClick={onNewProject} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>New Project</span>
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project) => {
                    const templateImage = projectTemplates.find(t => t.id === project.templateId);
                    return (
                        <Link href="/ide" key={project.name}>
                            <Card className="flex flex-col h-full hover:border-primary transition-colors cursor-pointer">
                                <CardHeader className="flex-row items-start gap-4 pb-4">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-card">
                                        {templateImage && <Image src={templateImage.imageUrl} alt={project.template} width={48} height={48} data-ai-hint={templateImage.imageHint} />}
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{project.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-1.5 text-sm pt-1">
                                            <Code className="w-4 h-4" /> {project.template}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    {/* You can add a brief project description here */}
                                </CardContent>
                                <CardFooter className="flex justify-between text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{project.lastUpdated}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3" />
                                            <span>{project.stats.stars}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <GitFork className="w-3 h-3" />
                                            <span>{project.stats.forks}</span>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    )
                })}

                <Card onClick={onNewProject} className="flex flex-col items-center justify-center h-full border-dashed border-2 hover:border-primary hover:text-primary transition-colors cursor-pointer min-h-[220px]">
                    <Plus className="w-8 h-8 mb-2" />
                    <p className="font-semibold">New Project</p>
                </Card>
            </div>
        </div>
    );
}