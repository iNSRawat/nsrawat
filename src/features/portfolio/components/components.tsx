import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { ComponentIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel";

export function Components() {
  const dsComponents = [
    { title: "Confusion Matrix", slug: "confusion-matrix", icon: "chart-area" },
    { title: "Model Metrics", slug: "model-metrics", icon: "calculator" },
    {
      title: "Feature Importance",
      slug: "feature-importance",
      icon: "bar-chart-2",
    },
    { title: "Training Progress", slug: "training-progress", icon: "activity" },
    {
      title: "Data Distribution",
      slug: "data-distribution",
      icon: "scatter-chart",
    },
    { title: "Correlation Heatmap", slug: "correlation-heatmap", icon: "grid" },
  ];

  return (
    <Panel id="components">
      <PanelHeader>
        <PanelTitle>
          Components
          <PanelTitleSup>({dsComponents.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="relative py-2">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-2 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {dsComponents.map((comp) => (
            <Link
              key={comp.slug}
              href={`/components/${comp.slug}`}
              className={cn(
                "group/post flex items-center gap-4 p-4 transition-[background-color] ease-out hover:bg-accent2",
                "max-sm:screen-line-before max-sm:screen-line-after",
                "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after",
              )}
            >
              <div
                className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background"
                aria-hidden
              >
                <ComponentIcon
                  className="pointer-events-none size-4 text-muted-foreground"
                  variant={comp.slug}
                />
              </div>

              <h2 className="leading-snug font-medium text-balance underline-offset-4 group-hover/post:underline">
                {comp.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      <div className="screen-line-before flex justify-center py-2">
        <Button variant="default" asChild>
          <Link href="/components">
            View All Components
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </Panel>
  );
}
