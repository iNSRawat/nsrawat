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
  sql: "mysql", // utilizing mysql icon for sql
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
  docker: "docker",
  mysql: "mysql",
  mongodb: "mongodb",
  nextjs: "nextjs",
  tailwindcss: "tailwindcss", // Present
  typescript: "ts", // Present
  react: "react", // Present
  streamlit: "streamlit",
  kaggle: "kaggle",
  chatgpt: "openai", // Present
};

export function TeckStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75",
        )}
      >
        <TooltipProvider>
          <ul className="flex flex-wrap gap-4 select-none">
            {TECH_STACK.map((tech) => {
              // Try to find a matching icon, or default to a generic one if not found
              // Ideally all commonly used ones should be in icons.tsx
              const IconComponent =
                getIcon(tech.key) || getIcon(ICON_MAP[tech.key]);

              if (!IconComponent) return null; // Or render fallback

              return (
                <li key={tech.key} className="flex">
                  <TooltipRoot>
                    <TooltipTrigger
                      render={
                        <a
                          href={tech.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={tech.title}
                          className="size-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {IconComponent}
                        </a>
                      }
                    />

                    <TooltipContent>
                      <p>{tech.title}</p>
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
