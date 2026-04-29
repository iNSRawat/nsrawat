"use client";

import { ArrowLeft, Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ALIASES, ASCII_ART, COMMANDS } from "@/features/portfolio/data/cli";

function makeLinkClickable(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-600 underline underline-offset-4 transition-colors hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

function formatLine(line: string) {
  if (!line) return line;
  if (line.startsWith("$")) {
    return (
      <>
        <span className="text-emerald-600 dark:text-emerald-400">nsrawat</span>
        <span className="text-zinc-400 dark:text-zinc-500">@</span>
        <span className="text-sky-600 dark:text-sky-400">cli</span>
        <span className="text-zinc-400 dark:text-zinc-500">:</span>
        <span className="text-purple-600 dark:text-purple-400">~</span>
        <span className="text-zinc-500 dark:text-zinc-400">$ </span>
        {line.slice(2)}
      </>
    );
  }
  return makeLinkClickable(line);
}

interface CliInterfaceProps {
  onGuiCommand: () => void;
}

export function CliInterface({ onGuiCommand }: CliInterfaceProps) {
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const artLines = ASCII_ART.split("\n").filter(
      (line) => line.trim().length > 0,
    );

    const welcomeMsg = "Welcome to my portfolio CLI! 👋";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOutput([
      ...artLines,
      "",
      "",
      "",
      welcomeMsg,
      'Type "help" or "?" to see available commands.',
      "",
    ]);
  }, [isMobile]); // ASCII_ART is a constant, but we add a comment to force HMR if needed

  // Scroll to bottom on output change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);

  // Focus input on click anywhere
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmedCmd = cmd.trim().toLowerCase();
      const [command] = trimmedCmd.split(" ");
      const resolvedCmd = ALIASES[command as keyof typeof ALIASES] || command;

      if (resolvedCmd === "clear") {
        setOutput([]);
        return;
      }

      if (resolvedCmd === "gui" || resolvedCmd === "g") {
        setOutput((prev) => [
          ...prev,
          `$ ${cmd}`,
          "Switching to GUI mode...",
          "",
        ]);
        setTimeout(onGuiCommand, 500);
        return;
      }

      const result = COMMANDS[resolvedCmd as keyof typeof COMMANDS];

      if (!result) {
        setOutput((prev) => [
          ...prev,
          `$ ${cmd}`,
          `Command not found: ${cmd}. Type "help" for available commands.`,
          "",
        ]);
        return;
      }

      const response = typeof result === "function" ? result() : result;
      setOutput((prev) => [...prev, `$ ${cmd}`, response, ""]);
    },
    [onGuiCommand],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setCommandHistory((prev) => [input, ...prev]);
    setHistoryIndex(-1);
    handleCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const availableCommands = [
        ...Object.keys(COMMANDS),
        ...Object.keys(ALIASES),
      ];
      const matches = availableCommands.filter((c) =>
        c.startsWith(input.toLowerCase()),
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setOutput((prev) => [
          ...prev,
          `$ ${input}`,
          `Matches: ${matches.join(", ")}`,
          "",
        ]);
      }
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const copyAll = async () => {
    try {
      const textToCopy = output.join("\n");
      await navigator.clipboard.writeText(textToCopy);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-zinc-50 font-mono dark:bg-zinc-950"
      onClick={focusInput}
    >
      {/* Scanline overlay for retro feel */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.03)_0px,rgba(0,0,0,0.03)_1px,transparent_1px,transparent_2px)] opacity-50 dark:opacity-50" />

      {/* Back Button */}
      <div className="absolute left-4 top-3 z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onGuiCommand();
          }}
          className="group flex items-center gap-2 rounded-md border border-zinc-200 bg-white/50 px-3 py-2 text-zinc-500 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-100/50 hover:text-zinc-800 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:border-zinc-700/50 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
          title="Back to GUI"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Global Copy Button */}
      <div className="absolute right-4 top-3 z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            copyAll();
          }}
          className="group flex items-center justify-center rounded-md border border-zinc-200 bg-white/50 p-2.5 text-zinc-500 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-100/50 hover:text-zinc-800 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:border-zinc-700/50 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
          title="Copy all output"
        >
          {copiedAll ? (
            <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          ) : (
            <Copy className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto" ref={outputRef}>
        <div className="mx-auto max-w-3xl space-y-1 p-4 pb-2 pt-14 md:pt-24 md:px-8">
          {output.map((line, i) => {
            const isAsciiArt =
              line.trim().startsWith("█") ||
              line.trim().startsWith("░") ||
              line.trim().startsWith("_") ||
              line.trim().startsWith("|");

            return (
              <div
                key={i}
                className={`group relative selection:bg-cyan-500/30 ${
                  isAsciiArt
                    ? "whitespace-pre font-bold leading-none tracking-normal text-[5px] min-[400px]:text-[7px] sm:text-[9px] md:text-xs lg:text-sm overflow-hidden flex justify-center"
                    : "whitespace-pre-wrap leading-relaxed"
                }`}
                style={
                  isAsciiArt
                    ? { scrollbarWidth: "none", msOverflowStyle: "none" }
                    : undefined
                }
              >
                <span className="text-zinc-800 dark:text-zinc-200">
                  {line.startsWith("http") ? (
                    <a
                      href={line}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 underline underline-offset-4 transition-all hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {line}
                    </a>
                  ) : isAsciiArt ? (
                    <>
                      {line.split("").map((char, ci) => (
                        <span
                          key={ci}
                          className={
                            char === "█"
                              ? "text-emerald-600 dark:text-[#98c379]"
                              : char === "░"
                                ? "text-emerald-300 dark:text-[#4a6340]"
                                : ""
                          }
                        >
                          {char}
                        </span>
                      ))}
                    </>
                  ) : (
                    formatLine(line)
                  )}
                </span>
                {line.trim() && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(line, i);
                    }}
                    className="absolute right-0 top-0 opacity-0 transition-opacity group-hover:opacity-100"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === i ? (
                      <span className="text-xs text-emerald-500 dark:text-emerald-400">
                        Copied!
                      </span>
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300" />
                    )}
                  </button>
                )}
              </div>
            );
          })}
          <div ref={bottomRef} className="h-4" />

          {/* Terminal Input */}
          <form
            onSubmit={handleSubmit}
            className="sticky bottom-0 flex items-center bg-zinc-50/80 py-2 backdrop-blur-sm dark:bg-zinc-950/80"
          >
            <span className="text-emerald-600 dark:text-emerald-400">
              nsrawat
            </span>
            <span className="text-zinc-400 dark:text-zinc-500">@</span>
            <span className="text-sky-600 dark:text-sky-400">cli</span>
            <span className="text-zinc-400 dark:text-zinc-500">:</span>
            <span className="text-purple-600 dark:text-purple-400">~</span>
            <span className="text-zinc-500 dark:text-zinc-400">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="ml-1 flex-1 bg-transparent text-zinc-800 caret-zinc-800 outline-none selection:bg-cyan-500/30 dark:text-zinc-200 dark:caret-zinc-200"
              autoFocus
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </form>
        </div>
      </div>
    </motion.div>
  );
}
