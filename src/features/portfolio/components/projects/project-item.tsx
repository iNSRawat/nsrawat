"use client";

import {
  ArrowRightIcon,
  BoxIcon,
  ExternalLink,
  Globe,
  InfinityIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
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

const getSkillIcon = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes("python")) return Icons.python;
  if (s.includes("pandas")) return Icons.pandas;
  if (s.includes("scikit")) return Icons.scikitlearn;
  if (s.includes("streamlit")) return Icons.streamlit;
  if (s.includes("matplotlib")) return Icons.matplotlib;
  if (s.includes("seaborn")) return Icons.seaborn;
  if (s.includes("react")) return Icons.react;
  if (s.includes("next.js")) return Icons.nextjs;
  if (s.includes("tailwind")) return Icons.tailwindcss;
  if (s.includes("typescript") || s === "ts") return Icons.ts;
  if (s.includes("javascript") || s === "js") return Icons.js;
  if (s.includes("datacamp")) return Icons.datacamp;
  if (s.includes("sql") || s.includes("database")) return Icons.mysql;
  if (s.includes("jupyter")) return Icons.jupyter;
  if (s.includes("tensorflow")) return Icons.tensorflow;
  if (s.includes("pytorch")) return Icons.pytorch;
  if (s.includes("numpy")) return Icons.numpy;
  if (s.includes("tableau")) return Icons.tableau;
  if (s.includes("powerbi")) return Icons.powerbi;
  if (s.includes("spark")) return Icons.apachespark;
  if (s.includes("hugging")) return Icons.huggingface;
  if (s.includes("kaggle")) return Icons.kaggle;
  if (s.includes("markdown")) return Icons.markdown;
  return null;
};

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
        "flex flex-col gap-3 rounded-xl border bg-card p-3 text-card-foreground shadow-sm sm:gap-4 sm:p-4",
        className,
      )}
    >
      {project.logo ? (
        <Link
          href={`/projects/${project.id}`}
          className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted shrink-0 block group"
        >
          <Image
            src={project.logo}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            quality={100}
            unoptimized
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/10" />
        </Link>
      ) : (
        <Link
          href={`/projects/${project.id}`}
          className="flex aspect-video w-full shrink-0 select-none items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background hover:bg-muted/80 transition-colors"
          aria-hidden="true"
        >
          <BoxIcon className="size-12" />
        </Link>
      )}

      <div className="flex flex-col flex-1 gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="text-lg font-bold leading-tight tracking-tight sm:text-xl">
              <Link
                href={`/projects/${project.id}`}
                className="hover:underline"
              >
                {project.title}
              </Link>
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0 pt-1">
            {project.demoUrl && (
              <a
                href={addQueryParams(project.demoUrl, UTM_PARAMS)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Live Demo"
              >
                <Globe className="size-5" />
              </a>
            )}
            <a
              href={addQueryParams(project.repoUrl, UTM_PARAMS)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub Repository"
            >
              <Icons.github className="size-5" />
            </a>
          </div>
        </div>

        {project.description && (
          <div className="text-sm text-muted-foreground">
            <div className="line-clamp-3">
              {project.description.replace(
                /^Problem: |- Approach: |- Result: /gm,
                "",
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground">Technologies</span>
          {project.skills.length > 0 && (
            <ul className="flex flex-wrap gap-3 items-center">
              {project.skills.map((skill, index) => {
                const Icon = getSkillIcon(skill);
                return Icon ? (
                  <li key={index} title={skill}>
                    <Icon className="size-5 text-muted-foreground hover:text-foreground transition-colors" />
                  </li>
                ) : (
                  <li key={index}>
                    <Tag className="px-2 py-0.5 text-[10px]">{skill}</Tag>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 mt-auto">
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            All Systems Operational
          </div>
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View Details <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
