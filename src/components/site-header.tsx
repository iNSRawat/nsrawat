import { TerminalIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { DesktopNav } from "@/components/desktop-nav";
import { NavItemGitHub } from "@/components/nav-item-github";
import { MAIN_NAV } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";
import { getAllSnippets } from "@/features/snippets/data/snippets";
import { cn } from "@/lib/utils";

import { SiteHeaderMark } from "./site-header-mark";
import { MobileSearchTrigger, SiteHeaderWrapper } from "./site-header-wrapper";
import { ThemeToggle } from "./theme-toggle";

const BrandContextMenu = dynamic(() =>
  import("@/components/brand-context-menu").then((mod) => mod.BrandContextMenu),
);

const CommandMenu = dynamic(() =>
  import("@/components/command-menu").then((mod) => mod.CommandMenu),
);

const MobileNav = dynamic(() =>
  import("@/components/mobile-nav").then((mod) => mod.MobileNav),
);

export function SiteHeader() {
  const posts = getAllPosts();
  const snippets = getAllSnippets().slice(0, 4);

  return (
    <>
      <SiteHeaderWrapper
        className={cn(
          "sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2",
          "data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]",
          "not-dark:data-[affix=true]:**:data-header-container:after:bg-border",
          "transition-shadow duration-300",
        )}
      >
        <div
          className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-2 after:z-1 after:transition-[background-color] sm:gap-4 md:max-w-3xl"
          data-header-container
        >
          <BrandContextMenu>
            <Link
              className="has-data-[visible=false]:pointer-events-none [&_svg]:h-8"
              href="/"
              aria-label="Home"
            >
              <SiteHeaderMark />
            </Link>
          </BrandContextMenu>

          <div className="flex-1" />

          <DesktopNav items={MAIN_NAV} />

          <div className="flex items-center gap-1 sm:gap-1.5">
            <span
              className="hidden sm:block h-4 w-px bg-border/60 mx-1"
              aria-hidden="true"
            />

            <Link
              href="/cli"
              className="hidden size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex shrink-0"
              title="CLI Mode"
              aria-label="CLI Mode"
            >
              <TerminalIcon className="size-4" />
            </Link>

            <div className="hidden sm:block">
              <CommandMenu posts={posts} snippets={snippets} />
            </div>

            {/* Mobile Search Trigger */}
            <MobileSearchTrigger />

            <span
              className="hidden sm:block h-4 w-px bg-border/60 mx-1"
              aria-hidden="true"
            />

            <NavItemGitHub />

            <span
              className="h-4 w-px bg-border/60 mx-0.5 sm:mx-1"
              aria-hidden="true"
            />

            <ThemeToggle />

            <MobileNav className="sm:hidden ml-1" items={MAIN_NAV} />
          </div>
        </div>
      </SiteHeaderWrapper>
    </>
  );
}
