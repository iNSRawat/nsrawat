import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";

import {
  getAllSnippets,
  getSnippetBySlug,
} from "@/features/snippets/data/snippets";
import { remarkComponent } from "@/lib/remark-component";
import { components } from "@/registry/registry-components";

const processor = remark().use(remarkMdx).use(remarkComponent).use(remarkGfm);

export async function generateStaticParams() {
  const snippets = getAllSnippets();
  const snippetParams = snippets.map((s) => ({ slug: s.slug }));
  const componentParams = components.map((c) => ({ slug: c.name }));
  return [...snippetParams, ...componentParams];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // Check if it's a registry component
  const component = components.find((c) => c.name === slug);

  if (component) {
    let code = "";
    if (component.files && component.files.length > 0) {
      const filePath = component.files[0].path;
      try {
        const absolutePath = path.join(process.cwd(), filePath);
        code = await fs.readFile(absolutePath, "utf-8");
      } catch (e) {
        console.error(`Error reading file for ${component.name}:`, e);
        code = "// Code not available";
      }
    }

    return new Response(
      `# ${component.title}

${component.description}

\`\`\`tsx
${code}
\`\`\`
`,
      {
        headers: {
          "Content-Type": "text/markdown;charset=utf-8",
        },
      },
    );
  }

  // Check if it's a snippet
  const snippet = getSnippetBySlug(slug);

  if (snippet) {
    const processed = await processor.process({
      value: snippet.content,
    });

    return new Response(
      `# ${snippet.metadata.title}

${snippet.metadata.description}

${processed.value}
`,
      {
        headers: {
          "Content-Type": "text/markdown;charset=utf-8",
        },
      },
    );
  }

  notFound();
}
