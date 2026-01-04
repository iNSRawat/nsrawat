import type { Metadata } from "next";
import Link from "next/link";

import { getAllSnippets } from "@/features/snippets/data/snippets";
import { cn } from "@/lib/utils";
import { components } from "@/registry/registry-components";

export const metadata: Metadata = {
  title: "Components",
  description: "A collection of components and snippets for data science.",
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
    <div className="min-h-svh">
      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">Components</h1>
      </div>

      <div className="p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      <Separator />

      <div className="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Snippets */}
        {snippets.map((snippet) => (
          <Link
            key={snippet.slug}
            href={`/components/${snippet.slug}`}
            className="group block"
          >
            <div className="h-full overflow-hidden rounded-lg border border-edge bg-card transition-colors hover:border-foreground/20 hover:bg-accent/5">
              <div className="border-b border-edge bg-accent/30 p-4 transition-colors group-hover:bg-accent/40">
                <h2 className="font-semibold group-hover:text-primary">
                  {snippet.metadata.title}
                </h2>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded bg-accent px-2 py-0.5 font-mono text-xs uppercase text-foreground">
                    Snippet
                  </span>
                  <span className="rounded bg-accent px-2 py-0.5 font-mono text-xs uppercase text-foreground">
                    {snippet.metadata.language}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  {snippet.metadata.description}
                </p>
              </div>
            </div>
          </Link>
        ))}

        {/* Registry Components */}
        {components.map((component) => (
          <Link
            key={component.name}
            href={`/components/${component.name}`}
            className="group block"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-lg border border-edge bg-card transition-colors hover:border-foreground/20 hover:bg-accent/5">
              <div className="border-b border-edge bg-accent/30 p-4 transition-colors group-hover:bg-accent/40">
                <h2 className="font-semibold group-hover:text-primary">
                  {component.title}
                </h2>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded bg-accent px-2 py-0.5 font-mono text-xs uppercase text-foreground">
                    DS Component
                  </span>
                </div>
              </div>
              <div className="flex-1 p-4">
                <p className="text-sm text-muted-foreground">
                  {component.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="h-4" />
    </div>
  );
}
