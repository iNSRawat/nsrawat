import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import path from "path";

import type {
  Snippet,
  SnippetMetadata,
} from "@/features/snippets/types/snippet";

function parseFrontmatter(fileContent: string) {
  const file = matter(fileContent, {
    engines: {
      yaml: (str) => yaml.load(str) as Record<string, unknown>,
    },
  });

  const data = { ...file.data } as Record<string, unknown>;

  if (data.createdAt instanceof Date) {
    data.createdAt = data.createdAt.toISOString();
  }
  if (data.updatedAt instanceof Date) {
    data.updatedAt = data.updatedAt.toISOString();
  }

  return {
    metadata: data as SnippetMetadata,
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
  const dir = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "src/features/snippets/content",
  );

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
