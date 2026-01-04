import { promises as fs } from "fs";
import { ArrowLeftIcon, CodeXmlIcon, EyeIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";

import { MDX } from "@/components/mdx";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prose } from "@/components/ui/typography";
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

    return (
      <div className="relative py-10">
        <Button
          variant="ghost"
          asChild
          className="mb-8 h-8 px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <Link href="/components" className="flex items-center gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Components
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight">
                {component.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {component.description}
              </p>
            </div>
          </div>
        </div>

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
              <Prose>
                <MDX code={code} />
              </Prose>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Check if it's a snippet
  const snippet = getSnippetBySlug(slug);

  if (snippet) {
    return (
      <div className="relative py-10">
        <Button
          variant="ghost"
          asChild
          className="mb-8 h-8 px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <Link href="/components" className="flex items-center gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Components
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            {snippet.metadata.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {snippet.metadata.description}
          </p>
        </div>

        <Tabs defaultValue="code" className="gap-4">
          <TabsList>
            <TabsTrigger className="px-2.5" value="preview" disabled>
              <EyeIcon className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger className="px-2.5" value="code">
              <CodeXmlIcon className="mr-2 h-4 w-4" />
              Code
            </TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="flex min-h-[350px] w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
              No preview available for this snippet.
            </div>
          </TabsContent>
          <TabsContent value="code">
            <div className="rounded-xl border border-edge p-4">
              <Prose>
                <MDX code={snippet.content} />
              </Prose>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Fallback for not found or unsupported types for now
  notFound();
}
