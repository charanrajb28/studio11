import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Code, Play, Share2, Star, User } from "lucide-react";
import { NewProjectDialog } from "./new-project-dialog";
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Separator } from "@/components/ui/separator";

const userAvatar = placeholderImages.find(p => p.id === "user-avatar");

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-4 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-semibold">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-lg">CodePod</span>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Star className="h-4 w-4 mr-1" />
                <span>Star</span>
            </Button>
            <span className="text-muted-foreground">/</span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        My First Project
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem>My First Project</DropdownMenuItem>
                    <DropdownMenuItem>Another Project</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
        <Button className="bg-primary/90 hover:bg-primary text-primary-foreground flex items-center gap-2">
          <Play className="h-4 w-4" />
          <span>Run</span>
        </Button>

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
            <NewProjectDialog />
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
