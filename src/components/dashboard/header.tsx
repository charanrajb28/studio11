"use client";

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Code, Plus, User, GitBranch } from "lucide-react";
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Input } from "../ui/input";
import { ImportGitDialog } from "./import-git-dialog";
import { useRouter } from 'next/navigation';

const userAvatar = placeholderImages.find(p => p.id === "user-avatar");

interface HeaderProps {
  onNewProject: () => void;
}

export function Header({ onNewProject }: HeaderProps) {
  const [isImportGitOpen, setImportGitOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-semibold">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-lg">CodePod</span>
        </div>
        <Input placeholder="Search projects..." className="w-64 hidden md:flex" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setImportGitOpen(true)} className="hidden sm:flex">
          <GitBranch className="mr-2 h-4 w-4" />
          Import from Repository
        </Button>
        <Button onClick={onNewProject}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
        <ImportGitDialog open={isImportGitOpen} onOpenChange={setImportGitOpen} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />}
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">CodePod User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  user@codepod.io
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onNewProject}>
                <Plus className="mr-2 h-4 w-4" />
                New Project
            </DropdownMenuItem>
             <DropdownMenuItem onClick={() => setImportGitOpen(true)}>
                <GitBranch className="mr-2 h-4 w-4" />
                Import Repository
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
