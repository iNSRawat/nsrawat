"use client";

import { BoxIcon, ExternalLink, InfinityIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProseMono } from "@/components/ui/typography";
import { UTM_PARAMS } from "@/config/site";
import { cn } from "@/lib/utils";
import { addQueryParams } from "@/utils/url";

import type { Project } from "../../types/projects";

export function ProjectItem({
  className,
  project,
  variant = "card",
}: {
  className?: string;
  project: Project;
  variant?: "compact" | "card";
}) {
  const { start, end } = project.period;
  const isOngoing = !end;
  const isSinglePeriod = end === start;

  const [isExpanded, setIsExpanded] = useState(false);

  if (variant === "compact") {
    return (
      <CollapsibleWithContext defaultOpen={project.isExpanded} asChild>
        <div className={className}>
          <div className="flex items-center hover:bg-accent2">
            {project.logo ? (
              <Image
                src={project.logo}
                alt={project.title}
                width={32}
                height={32}
                quality={100}
                className="mx-4 flex size-6 shrink-0 select-none"
                unoptimized
                aria-hidden="true"
              />
            ) : (
              <div
                className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none"
                aria-hidden="true"
              >
                <BoxIcon className="size-4" />
              </div>
            )}

            <div className="flex-1 border-l border-dashed border-edge">
              <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 pr-2 text-left">
                <div className="flex-1">
                  <h3 className="mb-1 text-balance font-medium leading-snug">
                    {project.title}
                  </h3>

                  <dl className="text-sm text-muted-foreground">
                    <dt className="sr-only">Period</dt>
                    <dd className="flex items-center gap-0.5">
                      <span>{start}</span>
                      {!isSinglePeriod && (
                        <>
                          <span className="font-mono">—</span>
                          {isOngoing ? (
                            <>
                              <InfinityIcon
                                className="size-4.5 translate-y-[0.5px]"
                                aria-hidden
                              />
                              <span className="sr-only">Present</span>
                            </>
                          ) : (
                            <span>{end}</span>
                          )}
                        </>
                      )}
                    </dd>
                  </dl>
                </div>

                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                        href={addQueryParams(project.repoUrl, UTM_PARAMS)}
                        target="_blank"
                        rel="noopener"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icons.github className="size-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>GitHub</p>
                    </TooltipContent>
                  </Tooltip>

                  {project.demoUrl && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                          href={addQueryParams(project.demoUrl, UTM_PARAMS)}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="size-4" />
                          <span className="sr-only">Live Demo</span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Demo</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>

                <div
                  className="shrink-0 text-muted-foreground [&_svg]:size-4"
                  aria-hidden
                >
                  <CollapsibleChevronsIcon />
                </div>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent className="group overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <div className="border-t border-edge shadow-inner">
              <div className="group-data-[state=closed]:animate-fade-out group-data-[state=open]:animate-fade-in space-y-4 p-4 duration-300">
                {project.description && (
                  <ProseMono>
                    <Markdown>{project.description}</Markdown>
                  </ProseMono>
                )}

                {project.skills.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5">
                    {project.skills.map((skill, index) => (
                      <li key={index} className="flex">
                        <Tag>{skill}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </CollapsibleWithContext>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm md:grid-cols-[280px_1fr]",
        className,
      )}
    >
      {project.logo ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted md:h-full">
          <Image
            src={project.logo}
            alt={project.title}
            fill
            className="object-cover"
            quality={100}
            unoptimized
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/10" />
        </div>
      ) : (
        <div
          className="flex aspect-video w-full shrink-0 select-none items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background md:h-full"
          aria-hidden="true"
        >
          <BoxIcon className="size-12" />
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
          <div className="space-y-1">
            <h3 className="text-xl font-bold leading-none tracking-tight hover:underline">
              <a
                href={addQueryParams(project.repoUrl, UTM_PARAMS)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.title}
              </a>
            </h3>
            <p className="text-xs text-muted-foreground">
              {project.period.start} - {project.period.end ?? "Present"}
            </p>
          </div>

          <div className="hidden flex-shrink-0 gap-2 md:flex">
            {project.demoUrl && (
              <Button
                variant="secondary"
                size="sm"
                className="h-7 px-3 text-xs"
                asChild
              >
                <a
                  href={addQueryParams(project.demoUrl, UTM_PARAMS)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-1.5 size-3" />
                  Live
                </a>
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              className="h-7 px-3 text-xs"
              asChild
            >
              <a
                href={addQueryParams(project.repoUrl, UTM_PARAMS)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.github className="mr-1.5 size-3" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        {project.description && (
          <div className="text-sm text-muted-foreground">
            <div
              className={cn(
                "prose prose-sm dark:prose-invert",
                !isExpanded && "line-clamp-2",
              )}
            >
              <Markdown>{project.description}</Markdown>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-xs font-medium text-blue-500 hover:underline focus:outline-none"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-foreground">
            Technologies Used:
          </span>
          {project.skills.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {project.skills.map((skill, index) => (
                <li key={index}>
                  <Tag className="text-xs px-2 py-0.5">{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-2 pt-1 md:hidden">
          {project.demoUrl && (
            <Button
              variant="secondary"
              size="sm"
              className="h-7 px-3 text-xs"
              asChild
            >
              <a
                href={addQueryParams(project.demoUrl, UTM_PARAMS)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-1.5 size-3" />
                Live
              </a>
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            className="h-7 px-3 text-xs"
            asChild
          >
            <a
              href={addQueryParams(project.repoUrl, UTM_PARAMS)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.github className="mr-1.5 size-3" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
