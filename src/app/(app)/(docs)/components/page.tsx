import type { Metadata } from "next";
import Link from "next/link";

import { ComponentCommand } from "@/components/component-command";
import { ComponentIcon } from "@/components/icons";
import { getAllSnippets } from "@/features/snippets/data/snippets";
import { cn } from "@/lib/utils";
import { components } from "@/registry/registry-components";

export const metadata: Metadata = {
  title: "Components",
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

export default function ComponentsPage() {
  const snippets = getAllSnippets();

  return (
    <div className="min-h-svh overflow-hidden">
      <div className="screen-line-after px-4 pt-10 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Components
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          {metadata.description}
        </p>
        <p className="mt-2 font-mono text-sm italic text-muted-foreground/70">
          *Some components & snippets written by me, some are from the internet
          (Thanks to the open source community).
        </p>
      </div>

      <div className="px-4 pb-0">
        <ComponentCommand />
      </div>

      <Separator />

      <div className="grid grid-cols-1 border-t border-edge md:grid-cols-2">
        {/* Registry Components */}
        {components.map((component, i) => (
          <Link
            key={component.name}
            href={`/components/${component.name}`}
            className={cn(
              "group flex items-center gap-3 border-b border-edge bg-background/50 px-6 py-4 transition-colors hover:bg-muted/50",
              i % 2 === 0 ? "md:border-r" : "",
            )}
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-edge bg-background/50 text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:text-foreground">
              <ComponentIcon variant={component.name} className="size-5" />
            </div>
            <span className="font-semibold text-foreground/80 transition-colors group-hover:text-foreground">
              {component.title}
            </span>
          </Link>
        ))}

        {/* Snippets */}
        {snippets.map((snippet, i) => (
          <Link
            key={snippet.slug}
            href={`/components/${snippet.slug}`}
            className={cn(
              "group flex items-center gap-3 border-b border-edge bg-background/50 px-6 py-4 transition-colors hover:bg-muted/50",
              // Continue the parity check from the previous list
              (i + components.length) % 2 === 0 ? "md:border-r" : "",
            )}
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-edge bg-background/50 text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:text-foreground">
              <ComponentIcon variant={snippet.slug} className="size-5" />
            </div>
            <div className="flex flex-1 items-center justify-between">
              <span className="font-semibold text-foreground/80 transition-colors group-hover:text-foreground">
                {snippet.metadata.title}
              </span>
            </div>
          </Link>
        ))}

        {/* Fill empty grid cell if total is odd */}
        {(components.length + snippets.length) % 2 !== 0 && (
          <div className="hidden border-b border-r border-edge md:block" />
        )}
      </div>

      <div className="py-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-edge bg-background px-3 py-1 text-xs text-muted-foreground">
          <span>Built for</span>
          <span className="flex items-center gap-1 font-medium text-foreground">
            <ComponentIcon variant="react" className="size-3" /> React 19
          </span>
          <span className="flex items-center gap-1 font-medium text-foreground">
            <ComponentIcon variant="tailwindcss" className="size-3" /> Tailwind
            CSS v4
          </span>
        </div>
      </div>
    </div>
  );
}
