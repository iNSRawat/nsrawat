import { PROJECTS } from "@/features/portfolio/data/projects";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    return new Response("Not found", { status: 404 });
  }

  const content = `# ${project.title}

## Overview
${project.overview || project.description}

## Details
- **Timeline**: ${project.duration || `${project.period.start} - ${project.period.end || "Present"}`}
- **Role**: ${project.role || "Developer"}
- **Team**: ${project.teamSize || "Solo"}
- **Status**: ${project.status || "Completed"}

## Technology Stack
${project.skills.map((skill) => `- ${skill}`).join("\n")}

${project.keyFeatures ? `## Key Features\n${project.keyFeatures}\n` : ""}
${project.keyChallenges ? `## Key Challenges\n${project.keyChallenges}\n` : ""}
${project.keyLearnings ? `## Key Learnings\n${project.keyLearnings}\n` : ""}
${project.whyIBuiltThis ? `## Why I Built This\n${project.whyIBuiltThis}\n` : ""}

## Links
- **Repository**: ${project.repoUrl}
${project.demoUrl ? `- **Live Demo**: ${project.demoUrl}` : ""}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
