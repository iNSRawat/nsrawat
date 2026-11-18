"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { cn } from "@/lib/utils";

export function NavItemGitHub({ className }: { className?: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "size-8 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground shrink-0 cursor-pointer select-none",
        className,
      )}
      asChild
    >
      <a
        href={SOURCE_CODE_GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub repository"
      >
        <Icons.github className="size-4 shrink-0" />
      </a>
    </Button>
  );
}
