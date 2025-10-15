"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";

interface ImportGitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportGitDialog({ open, onOpenChange }: ImportGitDialogProps) {
  const router = useRouter();

  const handleCreateProject = () => {
    // Here you would typically handle the project creation logic
    // and then redirect to the new project's IDE page.
    router.push('/ide');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import from a Git Repository</DialogTitle>
          <DialogDescription>
            Enter the URL of the repository you want to import.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input placeholder="https://github.com/user/repo.git" />
        </div>
        <DialogFooter>
          <Button onClick={handleCreateProject}>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}