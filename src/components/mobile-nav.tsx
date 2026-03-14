"use client";

import type { LucideIcon } from "lucide-react";
import {
  BracesIcon,
  FolderOpenIcon,
  HomeIcon,
  MenuIcon,
  NewspaperIcon,
  TerminalIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            className,
          )}
        >
          <span className="h-0.5 w-4 rounded-full bg-foreground" />
          <span className="h-0.5 w-4 rounded-full bg-foreground" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="h-fit bottom-auto w-56 px-0 pt-12 pb-6 sm:w-64 rounded-bl-3xl border-t-0 border-r-0 shadow-2xl"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>

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
                  "relative flex items-center gap-3 px-6 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-foreground" />
                )}
                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                {link.title}
              </Link>
            );
          })}

          <div className="my-2 mx-6 border-t border-border" />

          <Link
            href="/cli"
            onClick={() => setOpen(false)}
            className={cn(
              "relative flex items-center gap-3 px-6 py-2 text-sm font-medium transition-colors",
              pathname === "/cli"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {pathname === "/cli" && (
              <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-foreground" />
            )}
            <TerminalIcon className="h-4 w-4 shrink-0" />
            CLI
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
