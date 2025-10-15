"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, GitBranch } from "lucide-react";

interface NewProjectDialogProps {
  onSelectTemplate: () => void;
  onImportGit: () => void;
  children: React.ReactNode;
}

export function NewProjectDialog({ onSelectTemplate, onImportGit, children }: NewProjectDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            Choose how you'd like to start your new project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Button variant="outline" onClick={onImportGit}>
                <GitBranch className="mr-2 h-4 w-4" />
                Import from Git Repository
            </Button>
            <Button onClick={onSelectTemplate}>
                <Plus className="mr-2 h-4 w-4" />
                Create from Template
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}