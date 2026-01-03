import Image from "next/image";

import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/base/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

// Map tech keys to Simple Icons names and colors
const ICON_MAP: Record<string, { name: string; color: string }> = {
  python: { name: "python", color: "3776AB" },
  sql: { name: "mysql", color: "4479A1" },
  pandas: { name: "pandas", color: "150458" },
  numpy: { name: "numpy", color: "013243" },
  "scikit-learn": { name: "scikitlearn", color: "F7931E" },
  tensorflow: { name: "tensorflow", color: "FF6F00" },
  pytorch: { name: "pytorch", color: "EE4C2C" },
  matplotlib: { name: "plotly", color: "3F4F75" },
  seaborn: { name: "python", color: "4C8CBF" },
  jupyter: { name: "jupyter", color: "F37626" },
  tableau: { name: "tableau", color: "E97627" },
  powerbi: { name: "powerbi", color: "F2C811" },
  git: { name: "git", color: "F05032" },
  docker: { name: "docker", color: "2496ED" },
  mysql: { name: "mysql", color: "4479A1" },
  mongodb: { name: "mongodb", color: "47A248" },
  nextjs: { name: "nextdotjs", color: "000000" },
  tailwindcss: { name: "tailwindcss", color: "06B6D4" },
  typescript: { name: "typescript", color: "3178C6" },
  react: { name: "react", color: "61DAFB" },
  streamlit: { name: "streamlit", color: "FF4B4B" },
  kaggle: { name: "kaggle", color: "20BEFF" },
  chatgpt: { name: "openai", color: "412991" },
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
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <TooltipProvider>
          <ul className="flex flex-wrap gap-4 select-none">
            {TECH_STACK.map((tech) => {
              const iconInfo = ICON_MAP[tech.key];
              const iconUrl = iconInfo
                ? `https://cdn.simpleicons.org/${iconInfo.name}/${iconInfo.color}`
                : `https://cdn.simpleicons.org/${tech.key}`;

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
                        />
                      }
                    >
                      <Image
                        src={iconUrl}
                        alt={`${tech.title} icon`}
                        width={32}
                        height={32}
                        unoptimized
                        className="size-8"
                      />
                    </TooltipTrigger>

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
