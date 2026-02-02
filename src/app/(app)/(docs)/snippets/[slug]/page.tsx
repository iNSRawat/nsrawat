import { getTableOfContents } from "fumadocs-core/content/toc";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InlineTOC } from "@/components/inline-toc";
import { MDX } from "@/components/mdx";
import { Button } from "@/components/ui/button";
import { Prose } from "@/components/ui/typography";
import { LLMCopyButtonWithViewOptions } from "@/features/blog/components/post-page-actions";
import {
  getAllSnippets,
  getSnippetBySlug,
} from "@/features/snippets/data/snippets";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const snippets = getAllSnippets();
  return snippets.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const snippet = getSnippetBySlug(slug);

  if (!snippet) {
    return {};
  }

  return {
    title: snippet.metadata.title,
    description: snippet.metadata.description,
  };
}

export default async function SnippetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const snippet = getSnippetBySlug(slug);

  if (!snippet) {
    notFound();
  }

  const toc = getTableOfContents(snippet.content);

  return (
    <>
      <div className="flex items-center justify-between p-2 pl-4">
        <Button
          className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
          variant="link"
          asChild
        >
          <Link href="/snippets">
            <ArrowLeftIcon />
            Snippets
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <LLMCopyButtonWithViewOptions
            markdownUrl={`/snippets/${slug}.mdx`}
            isComponent
          />
        </div>
      </div>

      <div className="screen-line-before screen-line-after">
        <div
          className={cn(
            "h-8",
            "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
            "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
          )}
        />
      </div>

      <Prose className="px-4">
        <h1 className="screen-line-after text-3xl font-semibold">
          {snippet.metadata.title}
        </h1>

        <p className="text-muted-foreground">{snippet.metadata.description}</p>

        <InlineTOC items={toc} />

        <div>
          <MDX code={snippet.content} />
        </div>
      </Prose>

      <div className="screen-line-before h-4 w-full" />
    </>
  );
}
