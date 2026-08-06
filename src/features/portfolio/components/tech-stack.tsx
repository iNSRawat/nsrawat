"use client";

import { Code2Icon } from "lucide-react";
import React from "react";

import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/base/ui/tooltip";
import { getIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

// Map tech keys to local icon keys
const ICON_MAP: Record<string, string> = {
  python: "python",
  sql: "mysql",
  pandas: "pandas",
  numpy: "numpy",
  "scikit-learn": "scikitlearn",
  tensorflow: "tensorflow",
  pytorch: "pytorch",
  matplotlib: "matplotlib",
  seaborn: "seaborn",
  jupyter: "jupyter",
  tableau: "tableau",
  powerbi: "powerbi",
  git: "git",
  github: "github",
  docker: "docker",
  snowflake: "snowflake",
  streamlit: "streamlit",
  kaggle: "kaggle",
  apachehadoop: "hadoop",
  apachespark: "spark",
  keras: "keras",
  scipy: "scipy",
  plotly: "plotly",
  databricks: "databricks",
  mlflow: "mlflow",
  opencv: "opencv",
  huggingface: "huggingface",
  apachekafka: "kafka",
  poetry: "poetry",
  mamba: "mamba",
};

export function TechStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-background/40 p-2.5 sm:p-4 md:p-5 backdrop-blur-xs",
        )}
      >
        <TooltipProvider>
          <ul className="flex flex-wrap items-stretch justify-start gap-1.5 sm:gap-2 select-none w-full">
            {TECH_STACK.map((tech) => {
              const IconComponent =
                getIcon(tech.key) || getIcon(ICON_MAP[tech.key]);

              return (
                <li key={tech.key} className="flex grow sm:grow-0">
                  <TooltipRoot>
                    <TooltipTrigger
                      render={
                        <a
                          href={tech.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={tech.title}
                          className="flex w-full sm:w-auto items-center justify-center sm:justify-start gap-1.5 sm:gap-2 rounded-full border border-edge bg-background/70 px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[10px] sm:text-[11px] font-medium text-foreground/90 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/80 hover:border-foreground/30 hover:text-foreground backdrop-blur-sm whitespace-nowrap shadow-xs"
                        >
                          <span
                            className="size-3.5 sm:size-4 flex items-center justify-center shrink-0 [&_svg]:size-full"
                            style={{
                              color: tech.theme
                                ? undefined
                                : tech.color || "currentColor",
                            }}
                          >
                            {IconComponent || (
                              <Code2Icon className="size-3.5 sm:size-4" />
                            )}
                          </span>
                          <span className="truncate">{tech.title}</span>
                        </a>
                      }
                    />

                    <TooltipContent>
                      <p className="font-mono text-xs">{tech.title}</p>
                    </TooltipContent>
                  </TooltipRoot>
                </li>
              );
            })}
          </ul>
        </TooltipProvider>
      </PanelContent>
    </Panel>
  );
}
