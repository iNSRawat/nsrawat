import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";
import { getAllSnippets } from "@/features/snippets/data/snippets";
import { components } from "@/registry/registry-components";

export function getIndexMdContent(): string {
  const allPosts = getAllPosts();
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

  return `# nsrawat.in

> A minimal, pixel-perfect dev portfolio, component registry, and blog to showcase my work in Data Science and Marketing.

- [About](${SITE_INFO.url}/about.md): A quick intro to me, my tech stack, and how to connect.
- [Experience](${SITE_INFO.url}/experience.md): Highlights from my career and key roles I've taken on.
- [Projects](${SITE_INFO.url}/projects.md): Selected projects that show my skills and creativity.
- [Certifications](${SITE_INFO.url}/certifications.md): Certifications and credentials I've earned.
- [Snippets](${SITE_INFO.url}/snippets.md): Code snippets, interactive components, and practical solutions.
- [Blog](${SITE_INFO.url}/blog.md): Every blog post, newest first, with publish dates.

## Snippets

${allItems
  .map(
    (item) =>
      `- [${item.title}](${SITE_INFO.url}/snippets/${item.slug}.md): ${item.description}`,
  )
  .join("\n")}

## Blog

${allPosts
  .map(
    (item) =>
      `- [${item.metadata.title}](${SITE_INFO.url}/blog/${item.slug}.md): ${item.metadata.description}`,
  )
  .join("\n")}
`;
}

export const dynamic = "force-static";

export async function GET() {
  return new Response(getIndexMdContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
