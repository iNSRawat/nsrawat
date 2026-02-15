import { PROJECTS } from "@/features/portfolio/data/projects";

const content = `# Projects

${PROJECTS.map((item) => {
  const skills = `\n\nSkills: ${item.skills.join(", ")}`;
  const description = item.description ? `\n\n${item.description.trim()}` : "";
  const projectUrl = item.demoUrl ? `\n\nDemo URL: ${item.demoUrl}` : "";
  return `## ${item.title}\n\nRepository: ${item.repoUrl}${projectUrl}${skills}${description}`;
}).join("\n\n")}
`;

export const dynamic = "force-static";

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
