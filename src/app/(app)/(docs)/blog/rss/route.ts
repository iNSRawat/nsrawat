import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";

export const dynamic = "force-static";

export function GET() {
  const allPosts = getAllPosts();

  const escapeXml = (unsafe: string) =>
    unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "'":
          return "&apos;";
        case '"':
          return "&quot;";
        default:
          return c;
      }
    });

  const itemsXml = allPosts
    .map(
      (post) =>
        `<item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${SITE_INFO.url}/blog/${post.slug}</link>
          <description>${escapeXml(post.metadata.description || "")}</description>
          <pubDate>${new Date(post.metadata.createdAt).toISOString()}</pubDate>
        </item>`,
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Blog | ${escapeXml(SITE_INFO.name)}</title>
      <link>${SITE_INFO.url}</link>
      <description>${escapeXml(SITE_INFO.description)}</description>
      ${itemsXml}
    </channel>
  </rss>`.trim();

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
