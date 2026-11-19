"use client";

import { Code2Icon } from "lucide-react";
import React from "react";

import { getIcon } from "@/components/icons";

import { SKILLS } from "../data/skills";
import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelHeader, PanelTitle } from "./panel";

const ICON_ALIAS: Record<string, string> = {
  "scikit-learn": "scikitlearn",
  "jupyter notebook": "jupyter",
  "power bi": "powerbi",
  "hugging face": "huggingface",
  "git & github": "github",
};

const TECH_MAP = new Map(
  TECH_STACK.flatMap((t) => [
    [t.title.toLowerCase(), t],
    [t.key.toLowerCase(), t],
  ]),
);

function getSkillMeta(skill: string) {
  const normalized = skill.toLowerCase();
  const found = TECH_MAP.get(normalized);
  if (!found) return null;

  return {
    href: found.href,
    color: found.color,
    theme: found.theme,
    icon: getIcon(ICON_ALIAS[normalized] || found.key) || getIcon(found.key),
  };
}

export function TechStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <div className="relative select-none sm:[--col-w:9.5rem] md:[--col-w:10.25rem]">
        {/* Dotted vertical separator synchronized with left column */}
        <div
          className="pointer-events-none absolute inset-y-0 left-[var(--col-w)] -z-1 w-px max-sm:hidden"
          style={{
            background:
              "linear-gradient(to bottom, var(--line-soft) 1px, transparent 1px) 0 0 / 1px 4px repeat-y",
          }}
          aria-hidden="true"
        />

        <div>
          {SKILLS.map((category, index) => {
            const categoryId = `stack-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

            return (
              <div
                key={category.title}
                className="relative grid items-start gap-y-1.5 py-1.5 sm:py-2 sm:items-center sm:grid-cols-[var(--col-w)_1fr]"
              >
                {/* Dotted horizontal row separator confined inside the container */}
                <div
                  className="pointer-events-none absolute bottom-0 inset-x-0 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, var(--line-soft) 1px, transparent 1px) 0 0 / 4px 1px repeat-x",
                  }}
                  aria-hidden="true"
                />
                <div
                  id={categoryId}
                  className="flex items-center pl-3 sm:pl-4 text-xs sm:text-[13px] font-medium text-foreground shrink-0"
                >
                  <span
                    className="mr-1.5 font-mono text-[10px] sm:text-[11px] text-muted-foreground/70 select-none"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{category.title}</span>
                </div>

                <ul
                  aria-labelledby={categoryId}
                  className="flex flex-wrap items-center gap-1 sm:gap-1.5 px-3 sm:px-4"
                >
                  {category.skills.map((skill) => {
                    const meta = getSkillMeta(skill);
                    const IconComponent = meta?.icon || (
                      <Code2Icon className="size-3 sm:size-3.5" />
                    );

                    return (
                      <li key={skill} className="flex">
                        <a
                          href={meta?.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-[22px] sm:h-6 items-center justify-center gap-1 sm:gap-1.5 rounded-full border border-edge bg-zinc-50/80 dark:bg-zinc-900/80 px-2 sm:px-2.5 font-mono text-[11px] sm:text-xs text-foreground transition-all duration-150 hover:bg-accent hover:border-foreground/30 hover:text-foreground [&_svg]:pointer-events-none [&_svg]:size-3 sm:[&_svg]:size-3.5 [&_svg]:shrink-0"
                        >
                          <span
                            className="flex items-center justify-center [&_svg]:size-3 sm:[&_svg]:size-3.5"
                            style={{
                              color: meta?.theme
                                ? undefined
                                : meta?.color || "currentColor",
                            }}
                          >
                            {IconComponent}
                          </span>
                          <span>{skill}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
