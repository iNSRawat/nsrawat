import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";

export function getBlogMdContent(): string {
  const allPosts = getAllPosts();

  return `# Blog

> Articles, insights, and guides on Data Science, Machine Learning, and Marketing Analytics.

Each link below returns the full post as Markdown. Drop the \`.md\` extension for the web page.

## All posts (${allPosts.length})

${allPosts
  .map((item) => {
    const date = item.metadata.createdAt
      ? ` (${item.metadata.createdAt.split("T")[0]})`
      : "";
    return `- [${item.metadata.title}](${SITE_INFO.url}/blog/${item.slug}.md)${date}: ${item.metadata.description}`;
  })
  .join("\n")}
`;
}

export const dynamic = "force-static";

export async function GET() {
  return new Response(getBlogMdContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
