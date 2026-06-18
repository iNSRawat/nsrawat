"use client";

import {
  BookmarkIcon,
  BracesIcon,
  FolderOpenIcon,
  HeartIcon,
  HomeIcon,
  MenuIcon,
  NewspaperIcon,
  TerminalIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { NavItemGitHub } from "@/components/nav-item-github";
import { SiteHeaderMark } from "@/components/site-header-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

const NAV_ICONS: Record<string, typeof HomeIcon> = {
  "/": HomeIcon,
  "/about": UserIcon,
  "/projects": FolderOpenIcon,
  "/blog": NewspaperIcon,
  "/snippets": BracesIcon,
  "/bookmarks": BookmarkIcon,
  "/sponsors": HeartIcon,
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

  // Close menu on screen resize to desktop
  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const listener = () => {
      if (media.matches) {
        setOpen(false);
      }
    };
    listener();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const flattenedItems = useMemo(() => {
    const list: NavItem[] = [];
    for (const item of items) {
      if (item.items) {
        list.push(...item.items);
      } else {
        list.push(item);
      }
    }
    return list;
  }, [items]);

  return (
    <div className={className}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-edge bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Open menu"
          >
            <MenuIcon className="size-4" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="top"
          className="w-full border-none bg-background p-0 [&>button]:hidden h-auto flex flex-col z-50"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation links and mobile options
          </SheetDescription>
          {/* Menu Header */}
          <div className="flex h-12 items-center justify-between border-b border-edge px-4 w-full md:max-w-3xl mx-auto">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center"
            >
              <SiteHeaderMark />
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <NavItemGitHub />
              <SheetClose asChild>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-edge bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <XIcon className="size-4" />
                  <span className="sr-only">Close menu</span>
                </button>
              </SheetClose>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-0.5 p-2 bg-background md:max-w-3xl mx-auto w-full">
            {flattenedItems.map((link) => {
              const Icon = NAV_ICONS[link.href];
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <SheetClose key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 h-9 font-mono text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4 shrink-0" />}
                    <span>{link.title}</span>
                  </Link>
                </SheetClose>
              );
            })}

            <div className="h-px bg-edge/30 my-1" />

            {/* CLI Link */}
            <SheetClose asChild>
              <Link
                href="/cli"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 h-9 font-mono text-sm font-medium transition-colors",
                  pathname === "/cli"
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <TerminalIcon className="h-4 w-4 shrink-0" />
                <span>CLI Mode</span>
              </Link>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
