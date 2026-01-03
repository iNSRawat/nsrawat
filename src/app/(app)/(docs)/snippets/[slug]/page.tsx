import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { MDX } from "@/components/mdx";
import { Button } from "@/components/ui/button";
import { Prose } from "@/components/ui/typography";
import { getAllSnippets, getSnippetBySlug } from "@/features/snippets/data/snippets";
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

    return (
        <div className="relative py-10">
            <Button
                variant="ghost"
                asChild
                className="mb-8 h-8 px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
            >
                <Link href="/snippets" className="flex items-center gap-2">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Snippets
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

            <Prose>
                <MDX code={snippet.content} />
            </Prose>
        </div>
    );
}
