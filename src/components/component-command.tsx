"use client";

import {
  CheckIcon,
  CopyIcon,
  DatabaseIcon,
  TerminalSquareIcon,
} from "lucide-react";
import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    pnpm: `pnpm dlx shadcn@latest add @iNSRawat/${currentComponent}`,
    npm: `npx shadcn@latest add @iNSRawat/${currentComponent}`,
    yarn: `npx shadcn@latest add @iNSRawat/${currentComponent}`,
    bun: `bun x shadcn@latest add @iNSRawat/${currentComponent}`,
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

  const mcpConfig = `{
  "registries": {
    "@iNSRawat": "https://nsrawat.in/r/{name}.json"
  }
}`;

  const [hasCopiedConfig, setHasCopiedConfig] = React.useState(false);

  const copyConfig = React.useCallback(() => {
    navigator.clipboard.writeText(mcpConfig);
    setHasCopiedConfig(true);
    setTimeout(() => setHasCopiedConfig(false), 2000);
  }, [mcpConfig]);

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center justify-between gap-y-2 border-b -mx-4 px-4 pt-1 pb-0">
        <div className="flex items-center gap-4">
          <TerminalSquareIcon className="size-4 mb-2 text-muted-foreground" />
          <div className="flex gap-1">
            {(["pnpm", "yarn", "npm", "bun"] as const).map((pm) => (
              <button
                key={pm}
                onClick={() => setPackageManager(pm)}
                className={cn(
                  "relative px-4 pb-2 text-sm font-medium transition-colors hover:text-foreground",
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
        <div className="flex items-center gap-2 mb-2">
          {/* MCP Configuration Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="h-6 gap-1.5 px-2 text-xs"
              >
                <DatabaseIcon className="size-3" />
                MCP
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Configure MCP</DialogTitle>
                <DialogDescription>
                  Copy and paste the following code into your project&apos;s
                  components.json.
                </DialogDescription>
              </DialogHeader>
              <div className="relative mt-4 rounded-md border bg-muted p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border bg-background">
                      <Icons.json className="w-2.5 h-2.5" />
                    </div>
                    components.json
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-muted-foreground hover:bg-accent hover:text-foreground"
                    onClick={copyConfig}
                  >
                    {hasCopiedConfig ? (
                      <CheckIcon className="size-3" />
                    ) : (
                      <CopyIcon className="size-3" />
                    )}
                    <span className="sr-only">Copy config</span>
                  </Button>
                </div>
                <pre className="overflow-x-auto text-xs font-mono leading-relaxed">
                  <code>{mcpConfig}</code>
                </pre>
              </div>
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto"
                  asChild
                >
                  <a
                    href="https://ui.shadcn.com/docs/mcp"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read the docs
                  </a>
                </Button>
                <DialogClose asChild>
                  <Button size="sm" className="h-8 text-xs">
                    Done
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-muted-foreground hover:bg-accent hover:text-foreground"
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
      <div className="-mx-4 px-4 py-2 border-b font-mono text-sm text-muted-foreground">
        <span className="text-foreground/50">$</span> {command}
      </div>
    </div>
  );
}
