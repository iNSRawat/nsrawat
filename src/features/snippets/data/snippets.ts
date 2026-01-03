import fs from "fs";
import matter from "gray-matter";
import path from "path";

import type { Snippet, SnippetMetadata } from "@/features/snippets/types/snippet";

function parseFrontmatter(fileContent: string) {
    const file = matter(fileContent);

    return {
        metadata: file.data as SnippetMetadata,
        content: file.content,
    };
}

function getMDXFiles(dir: string) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
    const mdxFiles = getMDXFiles(dir);

    return mdxFiles.map<Snippet>((file) => {
        const { metadata, content } = readMDXFile(path.join(dir, file));
        const slug = path.basename(file, path.extname(file));

        return {
            metadata,
            slug,
            content,
        };
    });
}

export function getAllSnippets() {
    const dir = path.join(process.cwd(), "src/features/snippets/content");

    // Create dir if not exists (for build safety)
    if (!fs.existsSync(dir)) {
        return [];
    }

    return getMDXData(dir).sort((a, b) => {
        return (
            new Date(b.metadata.createdAt).getTime() -
            new Date(a.metadata.createdAt).getTime()
        );
    });
}

export function getSnippetBySlug(slug: string) {
    return getAllSnippets().find((snippet) => snippet.slug === slug);
}
