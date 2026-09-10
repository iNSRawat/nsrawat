import type { Metadata } from "next";

import { StripedSeparator } from "@/components/striped-separator";
import { ProjectItem } from "@/features/portfolio/components/projects/project-item";
import { PROJECTS } from "@/features/portfolio/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of data science and machine learning projects by N S Rawat.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-2 sm:px-4">
        <h1 className="text-2xl font-semibold sm:text-3xl">Projects</h1>
      </div>

      <div className="p-2 sm:p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      <StripedSeparator />

      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4">
        {PROJECTS.map((project) => (
          <ProjectItem key={project.id} project={project} variant="card" />
        ))}
      </div>

      <StripedSeparator />

      <div className="p-4 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          View more projects on{" "}
          <a
            href="https://github.com/iNSRawat"
            className="link font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>

      <div className="h-4" />
    </div>
  );
}
