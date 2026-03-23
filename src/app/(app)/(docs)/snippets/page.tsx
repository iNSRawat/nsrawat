import type { Metadata } from "next";
import Link from "next/link";

import { ComponentIcon } from "@/components/icons";
import { ComponentCommand } from "@/components/snippets-command";
import { getAllSnippets } from "@/features/snippets/data/snippets";
import { cn } from "@/lib/utils";
import { components } from "@/registry/registry-components";

export const metadata: Metadata = {
  title: "Snippets",
  description:
    "My personal stash of data science components & code snippets that make my life easier. They're simple and reusable. Feel free to copy, tweak, and use them as you like.",
};

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className,
      )}
    />
  );
}

export default function SnippetsPage() {
  const snippets = getAllSnippets();

  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-2 sm:px-4">
        <h1 className="text-2xl font-semibold sm:text-3xl">Snippets</h1>
      </div>

      <div className="p-2 sm:p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description}
        </p>
        <p className="mt-2 font-mono text-sm italic text-muted-foreground/70">
          *Some components & snippets written by me, some are from the internet
          (Thanks to the open source community).
        </p>
      </div>

      <div className="px-2 pb-0 sm:px-4">
        <ComponentCommand />
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Registry Components */}
        {components.map((component, i) => (
          <Link
            key={component.name}
            href={`/snippets/${component.name}`}
            className={cn(
              "group flex items-center gap-2 border-b border-edge bg-background/50 px-2 py-3 transition-colors hover:bg-muted/50 sm:px-3 sm:py-3",
              i % 3 !== 2 ? "md:border-r" : "",
              "max-md:screen-line-before max-md:screen-line-after",
              "md:nth-[3n+1]:screen-line-before md:nth-[3n+1]:screen-line-after",
            )}
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-edge bg-background/50 text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:text-foreground">
              <ComponentIcon variant={component.name} className="size-4" />
            </div>
            <span className="shrink-0 whitespace-nowrap tracking-tight text-[13px] sm:text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
              {component.title}
            </span>
          </Link>
        ))}

        {/* Snippets */}
        {snippets.map((snippet, i) => (
          <Link
            key={snippet.slug}
            href={`/snippets/${snippet.slug}`}
            className={cn(
              "group flex items-center gap-2 border-b border-edge bg-background/50 px-2 py-3 transition-colors hover:bg-muted/50 sm:px-3 sm:py-3",
              // Continue the parity check from the previous list
              (i + components.length) % 3 !== 2 ? "md:border-r" : "",
              "max-md:screen-line-before max-md:screen-line-after",
              "md:nth-[3n+1]:screen-line-before md:nth-[3n+1]:screen-line-after",
            )}
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-edge bg-background/50 text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:text-foreground">
              <ComponentIcon variant={snippet.slug} className="size-4" />
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-between">
              <span className="shrink-0 whitespace-nowrap tracking-tight text-[13px] sm:text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                {snippet.metadata.title}
              </span>
            </div>
          </Link>
        ))}

        {/* Fill empty grid cells to complete the 3-column row */}
        {Array.from({
          length: (3 - ((components.length + snippets.length) % 3)) % 3,
        }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className={cn(
              "hidden border-b border-edge md:block",
              (components.length + snippets.length + i) % 3 !== 2
                ? "md:border-r"
                : "",
              "md:nth-[3n+1]:screen-line-after",
            )}
          />
        ))}
      </div>

      <div className="h-12 sm:h-20" />
    </div>
  );
}
