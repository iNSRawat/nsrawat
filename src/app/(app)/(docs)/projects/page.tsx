import type { Metadata } from "next";
import Link from "next/link";

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
      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">Projects</h1>
      </div>

      <div className="p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group block rounded-lg border border-edge p-4",
              "transition-all hover:border-muted-foreground/30 hover:bg-accent/50"
            )}
          >
            <div className="flex items-start gap-3">
              {project.logo && (
                <img
                  src={project.logo}
                  alt={project.title}
                  className="size-10 rounded-md object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold underline-offset-4 group-hover:underline">
                  {project.title}
                </h2>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {project.period.start}{" "}
                  {project.period.end ? `- ${project.period.end}` : ""}
                </p>
              </div>
            </div>

            <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
              {project.description.split("\n")[0]}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="rounded bg-accent px-2 py-0.5 font-mono text-xs"
                >
                  {skill}
                </span>
              ))}
              {project.skills.length > 4 && (
                <span className="px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  +{project.skills.length - 4} more
                </span>
              )}
            </div>
          </a>
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
        className
      )}
    />
  );
}
