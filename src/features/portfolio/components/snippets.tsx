import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { ComponentIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getAllSnippets } from "@/features/snippets/data/snippets";
import { components } from "@/registry/registry-components";

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel";

export function Snippets() {
  const totalSnippets = getAllSnippets().length + components.length;

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
    <Panel id="notes">
      <PanelHeader>
        <PanelTitle>
          Notes
          <PanelTitleSup>({totalSnippets})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="relative py-1">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-2 max-sm:hidden sm:grid-cols-2 md:grid-cols-3">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge md:border-x"></div>
          <div className="hidden border-l border-edge md:block"></div>
        </div>

        {/* Row dividers confined within container */}
        <div
          className="pointer-events-none absolute top-1/2 inset-x-0 h-px -translate-y-1/2 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, var(--line-soft) 1px, transparent 1px) 0 0 / 4px 1px repeat-x",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/3 inset-x-0 h-px -translate-y-1/2 hidden sm:max-md:block"
          style={{
            background:
              "linear-gradient(to right, var(--line-soft) 1px, transparent 1px) 0 0 / 4px 1px repeat-x",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-2/3 inset-x-0 h-px -translate-y-1/2 hidden sm:max-md:block"
          style={{
            background:
              "linear-gradient(to right, var(--line-soft) 1px, transparent 1px) 0 0 / 4px 1px repeat-x",
          }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {dsComponents.map((comp, index) => (
            <Link
              key={comp.slug}
              href={`/notes/${comp.slug}`}
              className="group/post relative flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 transition-[background-color] ease-out hover:bg-accent2"
            >
              {index < dsComponents.length - 1 && (
                <div
                  className="pointer-events-none absolute bottom-0 inset-x-0 h-px sm:hidden"
                  style={{
                    background:
                      "linear-gradient(to right, var(--line-soft) 1px, transparent 1px) 0 0 / 4px 1px repeat-x",
                  }}
                  aria-hidden="true"
                />
              )}
              <div
                className="flex size-5 sm:size-5.5 shrink-0 items-center justify-center rounded-md border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background"
                aria-hidden
              >
                <ComponentIcon
                  className="pointer-events-none size-3 sm:size-3.5 text-muted-foreground"
                  variant={comp.slug}
                />
              </div>

              <h2 className="truncate text-xs sm:text-[13px] font-medium underline-offset-4 group-hover/post:underline">
                {comp.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center py-2">
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(to right, var(--line-soft) 1px, transparent 1px) 0 0 / 4px 1px repeat-x",
          }}
          aria-hidden="true"
        />
        <Button
          variant="default"
          size="sm"
          asChild
          className="h-7 text-xs px-3"
        >
          <Link href="/notes">
            View All Notes
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </Button>
      </div>
    </Panel>
  );
}
