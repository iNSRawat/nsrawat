import { getIndexMdContent } from "@/app/(llms)/index.md/route";

export const dynamic = "force-static";

export async function GET() {
  return new Response(getIndexMdContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
