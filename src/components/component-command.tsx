"use client";

import { CheckIcon, CopyIcon, TerminalSquareIcon } from "lucide-react";
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
    "pip" | "conda" | "poetry" | "uv" | "pipx" | "mamba" | "pdm" | "hatch"
  >("pip");
  const [componentIndex, setComponentIndex] = React.useState(0);

  const dsLibraries = [
    "streamlit",
    "pandas",
    "scikit-learn",
    "transformers",
    "mlflow",
    "jupyterlab",
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setComponentIndex((prev) => (prev + 1) % dsLibraries.length);
    }, 3000); // Change library every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const currentLibrary = dsLibraries[componentIndex];

  const commandMap = {
    pip: `pip install ${currentLibrary}`,
    conda: `conda install -c conda-forge ${currentLibrary}`,
    poetry: `poetry add ${currentLibrary}`,
    uv: `uv pip install ${currentLibrary}`,
    pipx: `pipx install ${currentLibrary}`,
    mamba: `mamba install -c conda-forge ${currentLibrary}`,
    pdm: `pdm add ${currentLibrary}`,
    hatch: `hatch add ${currentLibrary}`,
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

  // Data Science MCP Servers
  const dsMCPServers = [
    {
      name: "Streamlit",
      description: "Build data apps in Python",
      url: "https://github.com/streamlit/streamlit",
      color: "from-red-500 to-pink-500",
    },
    {
      name: "Hugging Face",
      description: "ML models & datasets hub",
      url: "https://github.com/huggingface/huggingface_hub",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Jupyter",
      description: "Interactive notebooks",
      url: "https://github.com/jupyter/jupyter",
      color: "from-orange-500 to-amber-500",
    },
    {
      name: "MLflow",
      description: "ML lifecycle platform",
      url: "https://github.com/mlflow/mlflow",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "DVC",
      description: "Data version control",
      url: "https://github.com/iterative/dvc",
      color: "from-purple-500 to-violet-500",
    },
    {
      name: "W&B",
      description: "ML experiment tracking",
      url: "https://github.com/wandb/wandb",
      color: "from-amber-500 to-yellow-500",
    },
  ];

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center justify-between gap-y-2 border-b -mx-4 px-4 pt-1 pb-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <TerminalSquareIcon className="size-4 mb-2 text-muted-foreground hidden sm:block" />
          <div className="flex gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar pb-2 -mb-2">
            {(
              [
                "pip",
                "conda",
                "poetry",
                "uv",
                "pipx",
                "mamba",
                "pdm",
                "hatch",
              ] as const
            ).map((pm) => (
              <button
                key={pm}
                onClick={() => setPackageManager(pm)}
                className={cn(
                  "relative px-2 sm:px-4 pb-2 text-xs sm:text-sm font-medium transition-colors hover:text-foreground whitespace-nowrap flex-shrink-0",
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
                <Icons.mcp className="size-3" />
                MCP
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%] sm:max-w-lg rounded-lg">
              <DialogHeader>
                <DialogTitle>Data Science MCP Servers</DialogTitle>
                <DialogDescription>
                  Open source tools that integrate with the Model Context
                  Protocol for data science workflows.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {dsMCPServers.map((server) => (
                  <a
                    key={server.name}
                    href={server.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative overflow-hidden rounded-lg border bg-card p-3 transition-all hover:border-primary hover:shadow-md"
                  >
                    <div
                      className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
                        server.color,
                      )}
                    />
                    <div className="relative">
                      <h4 className="font-semibold text-sm mb-1">
                        {server.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {server.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto"
                  asChild
                >
                  <a
                    href="https://modelcontextprotocol.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn about MCP
                  </a>
                </Button>
                <DialogClose asChild>
                  <Button size="sm" className="h-8 text-xs">
                    Close
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
        {command}
      </div>
    </div>
  );
}
