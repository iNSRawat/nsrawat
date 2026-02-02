import { promises as fs } from "fs";
import { getTableOfContents } from "fumadocs-core/content/toc";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CodeXmlIcon,
  EyeIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";

import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/base/ui/tooltip";
import { InlineTOC } from "@/components/inline-toc";
import { MDX } from "@/components/mdx";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prose } from "@/components/ui/typography";
import { LLMCopyButtonWithViewOptions } from "@/features/blog/components/post-page-actions";
import { PostShareMenu } from "@/features/blog/components/post-share-menu";
import {
  getAllSnippets,
  getSnippetBySlug,
} from "@/features/snippets/data/snippets";
import { cn } from "@/lib/utils";
import { demos } from "@/registry/demo-registry";
import { components } from "@/registry/registry-components";

export async function generateStaticParams() {
  const snippets = getAllSnippets();
  const snippetParams = snippets.map((s) => ({ slug: s.slug }));
  const componentParams = components.map((c) => ({ slug: c.name }));
  return [...snippetParams, ...componentParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  const component = components.find((c) => c.name === slug);
  if (component) {
    return {
      title: component.title,
      description: component.description,
    };
  }

  const snippet = getSnippetBySlug(slug);

  if (!snippet) {
    return {};
  }

  return {
    title: snippet.metadata.title,
    description: snippet.metadata.description,
  };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  // Get all slugs for navigation
  const allSlugs = [
    ...components.map((c) => c.name),
    ...getAllSnippets().map((s) => s.slug),
  ];
  const currentIndex = allSlugs.indexOf(slug);
  const previous = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const next =
    currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  // Check if it's a registry component
  const component = components.find((c) => c.name === slug);

  if (component) {
    // Find a demo for this component
    const demoName = `${component.name}-demo`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DemoComponent = (demos as any)[demoName];

    // Read component source code to display
    let code = "";
    if (component.files && component.files.length > 0) {
      const filePath = component.files[0].path;
      try {
        const absolutePath = path.join(process.cwd(), filePath);
        code = await fs.readFile(absolutePath, "utf-8");
        code = "```tsx\n" + code + "\n```";
      } catch (e) {
        console.error(`Error reading file for ${component.name}:`, e);
        code = "```tsx\n// Code not available\n```";
      }
    }

    const toc = getTableOfContents(code);

    return (
      <>
        <div className="flex items-center justify-between p-2 pl-4">
          <Button
            className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
            variant="link"
            asChild
          >
            <Link href="/components">
              <ArrowLeftIcon />
              Components
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <LLMCopyButtonWithViewOptions
              markdownUrl={`/components/${slug}.mdx`}
              isComponent
            />
            <PostShareMenu
              title={component.title ?? component.name}
              url={`/components/${slug}`}
            />
            <TooltipProvider>
              {previous && (
                <TooltipRoot>
                  <TooltipTrigger
                    render={
                      <Button variant="secondary" size="icon-sm" asChild>
                        <Link href={`/components/${previous}`} />
                      </Button>
                    }
                  >
                    <ArrowLeftIcon />
                    <span className="sr-only">Previous</span>
                  </TooltipTrigger>

                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      Previous
                      <Kbd>
                        <ArrowLeftIcon />
                      </Kbd>
                    </div>
                  </TooltipContent>
                </TooltipRoot>
              )}

              {next && (
                <TooltipRoot>
                  <TooltipTrigger
                    render={
                      <Button variant="secondary" size="icon-sm" asChild>
                        <Link href={`/components/${next}`} />
                      </Button>
                    }
                  >
                    <span className="sr-only">Next</span>
                    <ArrowRightIcon />
                  </TooltipTrigger>

                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      Next
                      <Kbd>
                        <ArrowRightIcon />
                      </Kbd>
                    </div>
                  </TooltipContent>
                </TooltipRoot>
              )}
            </TooltipProvider>
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
            {component.title}
          </h1>

          <p className="text-muted-foreground">{component.description}</p>

          <InlineTOC items={toc} />

          <Tabs defaultValue="preview" className="gap-4">
            <TabsList>
              <TabsTrigger
                className="px-2.5"
                value="preview"
                disabled={!DemoComponent}
              >
                <EyeIcon className="mr-2 h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger className="px-2.5" value="code">
                <CodeXmlIcon className="mr-2 h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="flex min-h-[350px] w-full items-center justify-center rounded-xl border border-edge bg-background p-10">
                {DemoComponent ? (
                  <DemoComponent />
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No preview available.
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="code">
              <div className="rounded-xl border border-edge p-4">
                <MDX code={code} />
              </div>
            </TabsContent>
          </Tabs>
        </Prose>

        <div className="screen-line-before h-4 w-full" />
      </>
    );
  }

  // Check if it's a snippet
  const snippet = getSnippetBySlug(slug);

  if (snippet) {
    const toc = getTableOfContents(snippet.content);

    return (
      <>
        <div className="flex items-center justify-between p-2 pl-4">
          <Button
            className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
            variant="link"
            asChild
          >
            <Link href="/components">
              <ArrowLeftIcon />
              Components
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <LLMCopyButtonWithViewOptions
              markdownUrl={`/components/${slug}.mdx`}
              isComponent
            />
            <PostShareMenu
              title={snippet.metadata.title}
              url={`/components/${slug}`}
            />
            <TooltipProvider>
              {previous && (
                <TooltipRoot>
                  <TooltipTrigger
                    render={
                      <Button variant="secondary" size="icon-sm" asChild>
                        <Link href={`/components/${previous}`} />
                      </Button>
                    }
                  >
                    <ArrowLeftIcon />
                    <span className="sr-only">Previous</span>
                  </TooltipTrigger>

                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      Previous
                      <Kbd>
                        <ArrowLeftIcon />
                      </Kbd>
                    </div>
                  </TooltipContent>
                </TooltipRoot>
              )}

              {next && (
                <TooltipRoot>
                  <TooltipTrigger
                    render={
                      <Button variant="secondary" size="icon-sm" asChild>
                        <Link href={`/components/${next}`} />
                      </Button>
                    }
                  >
                    <span className="sr-only">Next</span>
                    <ArrowRightIcon />
                  </TooltipTrigger>

                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      Next
                      <Kbd>
                        <ArrowRightIcon />
                      </Kbd>
                    </div>
                  </TooltipContent>
                </TooltipRoot>
              )}
            </TooltipProvider>
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

          <p className="text-muted-foreground">
            {snippet.metadata.description}
          </p>

          <InlineTOC items={toc} />

          <div>
            <MDX code={snippet.content} />
          </div>
        </Prose>

        <div className="screen-line-before h-4 w-full" />
      </>
    );
  }

  // Fallback for not found or unsupported types for now
  notFound();
}
