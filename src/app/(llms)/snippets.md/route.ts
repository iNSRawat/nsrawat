import { SITE_INFO } from "@/config/site";
import { getAllSnippets } from "@/features/snippets/data/snippets";
import { components } from "@/registry/registry-components";

export function getSnippetsMdContent(): string {
  const allSnippets = getAllSnippets();
  const allItems = [
    ...components.map((item) => ({
      title: item.title,
      slug: item.name,
      description: item.description,
    })),
    ...allSnippets.map((item) => ({
      title: item.metadata.title,
      slug: item.slug,
      description: item.metadata.description,
    })),
  ];

  return `# Snippets

> A curated collection of code snippets, interactive components, templates, and cheatsheets for Data Science, Machine Learning, and Development.

Each link below returns the full snippet as Markdown. Drop the \`.md\` extension for the web page.

## All snippets (${allItems.length})

${allItems
  .map(
    (item) =>
      `- [${item.title}](${SITE_INFO.url}/snippets/${item.slug}.md): ${item.description}`,
  )
  .join("\n")}
`;
}

export const dynamic = "force-static";

export async function GET() {
  return new Response(getSnippetsMdContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
