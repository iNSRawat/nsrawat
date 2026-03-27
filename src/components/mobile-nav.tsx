"use client";

import type { LucideIcon } from "lucide-react";
import {
  BracesIcon,
  FolderOpenIcon,
  HomeIcon,
  NewspaperIcon,
  SearchIcon,
  TerminalIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

const NAV_ICONS: Record<string, LucideIcon> = {
  "/": HomeIcon,
  "/about": UserIcon,
  "/projects": FolderOpenIcon,
  "/blog": NewspaperIcon,
  "/snippets": BracesIcon,
};

export function MobileNav({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleSearchClick = () => {
    // Dispatch Ctrl+K / Cmd+K to open the command menu
    const event = new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      ctrlKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <div
      className={cn("fixed bottom-4 left-1/2 z-50 -translate-x-1/2", className)}
    >
      <Popover open={open} onOpenChange={setOpen}>
        {/* Popover menu - opens upward from the bottom bar */}
        <PopoverContent
          side="top"
          align="center"
          sideOffset={8}
          className="w-48 rounded-lg border bg-popover p-1"
        >
          <nav className="flex flex-col">
            {items.map((link) => {
              const Icon = NAV_ICONS[link.href];
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  {link.title}
                </Link>
              );
            })}

            <div className="my-1 border-t border-border" />

            <Link
              href="/cli"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === "/cli"
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <TerminalIcon className="h-4 w-4 shrink-0" />
              CLI
            </Link>
          </nav>
        </PopoverContent>

        {/* Floating bottom bar */}
        <div className="flex items-center gap-1 rounded-full border bg-background/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={handleSearchClick}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <SearchIcon className="h-4 w-4" />
            <span>Search...</span>
          </button>

          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {open ? (
                <XIcon className="h-4 w-4" />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <span className="h-0.5 w-3.5 rounded-full bg-current" />
                  <span className="h-0.5 w-3.5 rounded-full bg-current" />
                </div>
              )}
              <span className="sr-only">Toggle Menu</span>
            </button>
          </PopoverTrigger>
        </div>
      </Popover>
    </div>
  );
}
