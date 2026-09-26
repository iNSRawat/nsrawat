"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SOURCE_CODE_GITHUB_URL } from "@/config/site";

export function NavItemGitHub() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground shrink-0 cursor-pointer select-none"
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
