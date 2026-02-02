"use client";

import { CheckIcon, CopyIcon, TerminalSquareIcon } from "lucide-react";
import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ComponentCommand() {
  const [hasCopied, setHasCopied] = React.useState(false);
  const [packageManager, setPackageManager] = React.useState<
    "pnpm" | "npm" | "yarn" | "bun"
  >("pnpm");
  const [componentIndex, setComponentIndex] = React.useState(0);

  const components = [
    "confusion-matrix",
    "model-metrics",
    "training-progress",
    "roc-curve",
    "feature-importance",
    "data-distribution",
    "correlation-heatmap",
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setComponentIndex((prev) => (prev + 1) % components.length);
    }, 3000); // Change component every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const currentComponent = components[componentIndex];

  const commandMap = {
    pnpm: `pnpm dlx shadcn add @iNSRawat/${currentComponent}`,
    npm: `npx shadcn add @iNSRawat/${currentComponent}`,
    yarn: `npx shadcn add @iNSRawat/${currentComponent}`,
    bun: `bun x shadcn add @iNSRawat/${currentComponent}`,
  };

  const command = commandMap[packageManager];

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [hasCopied]);

  const copyCommand = React.useCallback(() => {
    navigator.clipboard.writeText(command);
    setHasCopied(true);
  }, [command]);

  return (
    <div className="relative rounded-lg border border-edge bg-[#0c0c0c]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 pt-2.5 pb-0">
        <div className="flex items-center gap-4">
          <TerminalSquareIcon className="size-4 mb-2.5 text-muted-foreground" />
          <div className="flex gap-1">
            {(["pnpm", "yarn", "npm", "bun"] as const).map((pm) => (
              <button
                key={pm}
                onClick={() => setPackageManager(pm)}
                className={cn(
                  "relative px-4 pb-2.5 text-sm font-medium transition-colors hover:text-foreground",
                  packageManager === pm
                    ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-foreground"
                    : "text-muted-foreground",
                )}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-2.5">
          {/* MCP Button - Placeholder functionality or link */}
          <Button
            size="sm"
            variant="outline"
            className="h-6 gap-1.5 px-2 text-xs"
          >
            <Icons.json className="size-3" />
            MCP
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            onClick={copyCommand}
          >
            {hasCopied ? (
              <CheckIcon className="size-3" />
            ) : (
              <CopyIcon className="size-3" />
            )}
            <span className="sr-only">Copy command</span>
          </Button>
        </div>
      </div>
      <div className="px-4 py-3 font-mono text-sm text-muted-foreground">
        <span className="text-foreground/50">$</span> {command}
      </div>
    </div>
  );
}
