"use client";

import type { TOCItemType } from "fumadocs-core/toc";
import * as React from "react";

import { cn } from "@/lib/utils";

export type TOCItem = {
  title: React.ReactNode;
  url: string;
  depth?: number;
};

interface SnippetsTOCProps {
  items?: (TOCItem | TOCItemType)[];
}

export function SnippetsTOC({ items = [] }: SnippetsTOCProps) {
  const [activeId, setActiveId] = React.useState<string>("");
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!items.length) return;

    // Observe all headings that correspond to items
    const ids = items.map((item) => item.url.replace(/^#/, "")).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible entry closest to top
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -65% 0px",
        threshold: 0,
      },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed top-28 right-6 z-40 hidden xl:flex justify-end"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Default Minimap Scrubber (Horizontal Tick Lines) */}
      <div
        className={cn(
          "flex cursor-pointer flex-col items-end gap-2.5 py-2 pl-6 transition-opacity duration-200",
          isHovered ? "pointer-events-none opacity-0" : "opacity-100",
        )}
        aria-label="Table of contents minimap"
      >
        {items.map((item) => {
          const id = item.url.replace(/^#/, "");
          const isActive = activeId === id;

          return (
            <a
              key={item.url}
              href={item.url}
              aria-label={
                typeof item.title === "string" ? item.title : undefined
              }
              title={typeof item.title === "string" ? item.title : undefined}
              className="group flex h-2 items-center justify-end py-1 outline-hidden"
            >
              <span
                className={cn(
                  "block h-0.5 rounded-full transition-all duration-200",
                  isActive
                    ? "w-6 bg-foreground"
                    : "w-3 bg-muted-foreground/30 group-hover:w-4 group-hover:bg-foreground/70",
                )}
              />
            </a>
          );
        })}
      </div>

      {/* 2. Expanded Card on Hover */}
      <div
        className={cn(
          "absolute top-0 right-0 z-30 w-52 rounded-2xl border border-edge bg-background/95 p-4 shadow-xl backdrop-blur-md transition-all duration-200 dark:shadow-black/60",
          isHovered
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <div className="mb-2.5 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground/70 uppercase">
          On this page
        </div>

        <ul className="max-h-[calc(100vh-14rem)] space-y-2 overflow-y-auto pr-1 text-xs no-scrollbar">
          {items.map((item) => {
            const id = item.url.replace(/^#/, "");
            const isActive = activeId === id;

            return (
              <li
                key={item.url}
                style={{
                  paddingLeft:
                    item.depth && item.depth > 2
                      ? `${(item.depth - 2) * 10}px`
                      : undefined,
                }}
              >
                <a
                  href={item.url}
                  onClick={() => setIsHovered(false)}
                  className={cn(
                    "block truncate transition-colors",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
