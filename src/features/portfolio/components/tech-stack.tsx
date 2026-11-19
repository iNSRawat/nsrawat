"use client";

import { Code2Icon } from "lucide-react";
import React from "react";

import { getIcon } from "@/components/icons";

import { SKILLS } from "../data/skills";
import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelHeader, PanelTitle } from "./panel";

const SKILL_MAP: Record<
  string,
  { key: string; iconKey: string; href: string; color: string; theme?: boolean }
> = {
  python: {
    key: "python",
    iconKey: "python",
    href: "https://www.python.org/",
    color: "#3776AB",
  },
  sql: {
    key: "sql",
    iconKey: "sql",
    href: "https://www.w3schools.com/sql/",
    color: "#4479A1",
  },
  "scikit-learn": {
    key: "scikit-learn",
    iconKey: "scikitlearn",
    href: "https://scikit-learn.org/",
    color: "#F7931E",
  },
  tensorflow: {
    key: "tensorflow",
    iconKey: "tensorflow",
    href: "https://www.tensorflow.org/",
    color: "#FF6F00",
  },
  pytorch: {
    key: "pytorch",
    iconKey: "pytorch",
    href: "https://pytorch.org/",
    color: "#EE4C2C",
  },
  keras: {
    key: "keras",
    iconKey: "keras",
    href: "https://keras.io/",
    color: "#D00000",
  },
  opencv: {
    key: "opencv",
    iconKey: "opencv",
    href: "https://opencv.org/",
    color: "#5C3EE8",
  },
  pandas: {
    key: "pandas",
    iconKey: "pandas",
    href: "https://pandas.pydata.org/",
    color: "#150458",
  },
  numpy: {
    key: "numpy",
    iconKey: "numpy",
    href: "https://numpy.org/",
    color: "#013243",
  },
  scipy: {
    key: "scipy",
    iconKey: "scipy",
    href: "https://scipy.org/",
    color: "#8CAAEE",
  },
  "jupyter notebook": {
    key: "jupyter",
    iconKey: "jupyter",
    href: "https://jupyter.org/",
    color: "#F37626",
  },
  matplotlib: {
    key: "matplotlib",
    iconKey: "matplotlib",
    href: "https://matplotlib.org/",
    color: "#11557c",
  },
  seaborn: {
    key: "seaborn",
    iconKey: "seaborn",
    href: "https://seaborn.pydata.org/",
    color: "#ce011f",
  },
  plotly: {
    key: "plotly",
    iconKey: "plotly",
    href: "https://plotly.com/",
    color: "#3F4F75",
  },
  tableau: {
    key: "tableau",
    iconKey: "tableau",
    href: "https://www.tableau.com/",
    color: "#E97627",
  },
  "power bi": {
    key: "powerbi",
    iconKey: "powerbi",
    href: "https://powerbi.microsoft.com/",
    color: "#F2C811",
  },
  streamlit: {
    key: "streamlit",
    iconKey: "streamlit",
    href: "https://streamlit.io/",
    color: "#FF4B4B",
  },
  mlflow: {
    key: "mlflow",
    iconKey: "mlflow",
    href: "https://mlflow.org/",
    color: "#0194E2",
  },
  "hugging face": {
    key: "huggingface",
    iconKey: "huggingface",
    href: "https://huggingface.co/",
    color: "#FFD21E",
  },
  kaggle: {
    key: "kaggle",
    iconKey: "kaggle",
    href: "https://www.kaggle.com/",
    color: "#20BEFF",
  },
  databricks: {
    key: "databricks",
    iconKey: "databricks",
    href: "https://databricks.com/",
    color: "#FF3621",
  },
  git: {
    key: "git",
    iconKey: "git",
    href: "https://git-scm.com/",
    color: "#F05032",
  },
  github: {
    key: "github",
    iconKey: "github",
    href: "https://github.com/",
    color: "#181717",
    theme: true,
  },
  "git & github": {
    key: "github",
    iconKey: "github",
    href: "https://github.com/",
    color: "#181717",
    theme: true,
  },
  docker: {
    key: "docker",
    iconKey: "docker",
    href: "https://www.docker.com/",
    color: "#2496ED",
  },
  poetry: {
    key: "poetry",
    iconKey: "poetry",
    href: "https://python-poetry.org/",
    color: "#60A5FA",
  },
  mamba: {
    key: "mamba",
    iconKey: "mamba",
    href: "https://mamba.readthedocs.io/",
    color: "#34B4E3",
  },
  mysql: {
    key: "mysql",
    iconKey: "mysql",
    href: "https://www.mysql.com/",
    color: "#4479A1",
  },
  postgresql: {
    key: "postgresql",
    iconKey: "postgresql",
    href: "https://www.postgresql.org/",
    color: "#4169E1",
  },
  mongodb: {
    key: "mongodb",
    iconKey: "mongodb",
    href: "https://www.mongodb.com/",
    color: "#47A248",
  },
  snowflake: {
    key: "snowflake",
    iconKey: "snowflake",
    href: "https://www.snowflake.com/",
    color: "#29B5E8",
  },
};

function getSkillMeta(skill: string) {
  const normalized = skill.toLowerCase();
  if (SKILL_MAP[normalized]) {
    return SKILL_MAP[normalized];
  }
  const found = TECH_STACK.find(
    (t) =>
      t.title.toLowerCase() === normalized ||
      t.key.toLowerCase() === normalized,
  );
  if (found) {
    return {
      key: found.key,
      iconKey: found.key,
      href: found.href,
      color: found.color,
      theme: found.theme,
    };
  }
  return null;
}

export function TechStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <div className="relative select-none sm:[--col-w:10rem] md:[--col-w:10.5rem]">
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
                className="screen-line-after grid items-start gap-y-1.5 py-1.5 sm:py-2 sm:items-center sm:grid-cols-[var(--col-w)_1fr]"
              >
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
                    const IconComponent = (meta?.iconKey &&
                      getIcon(meta.iconKey)) ||
                      (meta?.key && getIcon(meta.key)) || (
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
