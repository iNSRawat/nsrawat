import type { Metadata } from "next";
import Link from "next/link";

import { ProjectItem } from "@/features/portfolio/components/projects/project-item";
import { PROJECTS } from "@/features/portfolio/data/projects";
import { cn } from "@/lib/utils";

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

      <Separator />

      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4">
        {PROJECTS.map((project) => (
          <ProjectItem key={project.id} project={project} variant="card" />
        ))}
      </div>

      <Separator />

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

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className,
      )}
    />
  );
}
