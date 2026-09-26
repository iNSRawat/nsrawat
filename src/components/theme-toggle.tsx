"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "./base/ui/tooltip";
import { Button } from "./ui/button";
import { Kbd } from "./ui/kbd";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { setMetaColor } = useMetaColor();
  const playClick = useSound("/audio/ui-sounds/click.wav");

  const switchTheme = useCallback(() => {
    playClick(0.5);
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
    setMetaColor(
      next === "dark" ? META_THEME_COLORS.dark : META_THEME_COLORS.light,
    );
  }, [resolvedTheme, setTheme, setMetaColor, playClick]);

  useHotkeys("d", switchTheme);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-8 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer shrink-0",
              className,
            )}
            onClick={switchTheme}
            aria-label="Toggle theme"
          />
        }
      >
        {/* Half-filled circle theme contrast icon matching chanhdai.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="size-4 shrink-0 transition-transform duration-200"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
        </svg>
        <span className="sr-only">Toggle theme</span>
      </TooltipTrigger>

      <TooltipContent className="pr-2 pl-3 font-mono text-xs">
        <div className="flex items-center gap-3">
          Toggle Mode
          <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
