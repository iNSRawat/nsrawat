"use client";

import { createClient } from "@supabase/supabase-js";
import {
  Blocks,
  CheckCircle2,
  ChevronRight,
  FileCode2,
  Files,
  FileText,
  FolderClosed,
  FolderOpen,
  GitBranch,
  Loader2,
  Play,
  Search,
  Settings,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

type EditorState = "editing" | "loading" | "success";
type ActiveFile = "contact" | "socialLinks";

const SOCIAL_LINKS = [
  { name: "Twitter", url: "https://x.com/NSRawat_in" },
  { name: "GitHub", url: "https://github.com/iNSRawat" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/insrawat" },
  { name: "Peerlist", url: "https://peerlist.io/nsrawat" },
  { name: "Kaggle", url: "https://www.kaggle.com/nsrawat" },
];

export function DeveloperContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [editorState, setEditorState] = useState<EditorState>("editing");
  const [activeFile, setActiveFile] = useState<ActiveFile>("contact");

  const handleSubmit = useCallback(async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!supabaseUrl || !supabaseKey) {
      toast.error("Supabase environment variables are missing.");
      return;
    }

    setEditorState("loading");

    const { error } = await supabase.from("contacts").insert([form]);

    if (error) {
      setEditorState("editing");
      toast.error("Error submitting form. Please try again.");
      console.error(error);
    } else {
      setEditorState("success");
    }
  }, [form]);

  const handleReset = useCallback(() => {
    setForm({ name: "", email: "", message: "" });
    setEditorState("editing");
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-[#1e1e1e] shadow-2xl">
      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-zinc-700/60 bg-[#1e1e1e] px-3 py-2 sm:px-4">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-[#ff5f57]" />
          <div className="size-3 rounded-full bg-[#febc2e]" />
          <div className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="hidden items-center gap-1.5 font-mono text-xs text-zinc-400 sm:flex">
          <span className="text-zinc-500">portfolio</span>
          <ChevronRight className="size-3 text-zinc-600" />
          <span className="text-zinc-500">src</span>
          <ChevronRight className="size-3 text-zinc-600" />
          <span className="text-zinc-300">
            {activeFile === "contact" ? "contact.tsx" : "socialLinks.tsx"}
          </span>
        </div>
        <div className="hidden items-center gap-2 rounded-md border border-zinc-700/50 bg-zinc-800/50 px-2.5 py-1 sm:flex">
          <Search className="size-3 text-zinc-500" />
          <span className="font-mono text-xs text-zinc-500">portfolio</span>
        </div>
      </div>

      <div className="flex">
        {/* Activity Bar */}
        <div className="hidden flex-col items-center justify-between border-r border-zinc-700/60 bg-[#1e1e1e] py-2 md:flex md:w-10">
          <div className="flex flex-col items-center gap-3">
            <Files className="size-4 text-zinc-300" />
            <Search className="size-4 text-zinc-500" />
            <GitBranch className="size-4 text-zinc-500" />
            <Blocks className="size-4 text-zinc-500" />
          </div>
          <Settings className="size-4 text-zinc-500" />
        </div>

        {/* Sidebar / Explorer */}
        <div className="hidden w-40 shrink-0 border-r border-zinc-700/60 bg-[#252526] lg:block">
          <div className="px-4 py-2.5">
            <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-400">
              EXPLORER
            </span>
          </div>
          <div className="space-y-0.5 px-2 text-[13px]">
            <div className="flex items-center gap-1.5 px-1 font-mono text-[#4ec9b0]">
              <ChevronRight className="size-3" />
              <span className="text-xs font-semibold tracking-wide">
                PORTFOLIO
              </span>
            </div>
            <div className="ml-4 flex items-center gap-1.5 px-1 py-0.5 text-zinc-400">
              <FolderClosed className="size-3.5 text-zinc-500" />
              <span className="font-mono text-xs">.next</span>
            </div>
            <div className="ml-4 flex items-center gap-1.5 px-1 py-0.5 text-zinc-300">
              <FolderOpen className="size-3.5 text-zinc-400" />
              <span className="font-mono text-xs">src</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveFile("contact")}
              className={cn(
                "ml-8 flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left",
                activeFile === "contact"
                  ? "bg-zinc-700/40 text-white"
                  : "text-zinc-400 hover:text-zinc-300",
              )}
            >
              <FileCode2 className="size-3.5 text-blue-400" />
              <span className="font-mono text-xs">contact.tsx</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFile("socialLinks")}
              className={cn(
                "ml-8 flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left",
                activeFile === "socialLinks"
                  ? "bg-zinc-700/40 text-white"
                  : "text-zinc-400 hover:text-zinc-300",
              )}
            >
              <FileCode2 className="size-3.5 text-yellow-500" />
              <span className="font-mono text-xs">socialLinks.tsx</span>
            </button>
            <div className="ml-8 flex items-center gap-1.5 px-1 py-0.5 text-zinc-400">
              <FileText className="size-3.5 text-purple-400" />
              <span className="font-mono text-xs">globals.css</span>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex min-h-[320px] flex-1 flex-col overflow-hidden">
          {/* Editor Tabs */}
          <div className="flex border-b border-zinc-700/60 bg-[#252526]">
            <button
              type="button"
              onClick={() => setActiveFile("contact")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 border-b-2 sm:gap-2 sm:px-4 sm:py-2",
                activeFile === "contact"
                  ? "border-blue-500 bg-[#1e1e1e]"
                  : "border-transparent",
              )}
            >
              <FileCode2
                className={cn(
                  "size-3.5",
                  activeFile === "contact"
                    ? "text-blue-400"
                    : "text-blue-400/60",
                )}
              />
              <span
                className={cn(
                  "font-mono text-xs",
                  activeFile === "contact" ? "text-zinc-200" : "text-zinc-500",
                )}
              >
                contact.tsx
              </span>
              <X
                className={cn(
                  "size-3",
                  activeFile === "contact" ? "text-zinc-500" : "text-zinc-600",
                )}
              />
            </button>
            <button
              type="button"
              onClick={() => setActiveFile("socialLinks")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 border-b-2 sm:gap-2 sm:px-4 sm:py-2",
                activeFile === "socialLinks"
                  ? "border-blue-500 bg-[#1e1e1e]"
                  : "border-transparent",
              )}
            >
              <FileCode2
                className={cn(
                  "size-3.5",
                  activeFile === "socialLinks"
                    ? "text-yellow-500"
                    : "text-yellow-500/60",
                )}
              />
              <span
                className={cn(
                  "font-mono text-xs",
                  activeFile === "socialLinks"
                    ? "text-zinc-200"
                    : "text-zinc-500",
                )}
              >
                socialLinks.tsx
              </span>
              <X
                className={cn(
                  "size-3",
                  activeFile === "socialLinks"
                    ? "text-zinc-500"
                    : "text-zinc-600",
                )}
              />
            </button>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-x-auto p-3 sm:p-4">
            {activeFile === "socialLinks" ? (
              <SocialLinksView />
            ) : editorState === "success" ? (
              <SuccessView onReset={handleReset} />
            ) : (
              <CodeEditor
                form={form}
                setForm={setForm}
                isLoading={editorState === "loading"}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeEditor({
  form,
  setForm,
  isLoading,
  onSubmit,
}: {
  form: { name: string; email: string; message: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; message: string }>
  >;
  isLoading: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="font-mono text-sm leading-relaxed sm:leading-8">
        {/* Line 1 */}
        <div className="flex items-start">
          <Ln n={1} />
          <div>
            <span className="text-[#569cd6]">const</span>{" "}
            <span className="text-[#dcdcaa]">sendMessage</span>{" "}
            <span className="text-zinc-400">=</span>{" "}
            <span className="text-[#569cd6]">async</span>{" "}
            <span className="text-zinc-300">(</span>
            <span className="text-[#9cdcfe]">data</span>
            <span className="text-zinc-300">)</span>{" "}
            <span className="text-[#569cd6]">=&gt;</span>{" "}
            <span className="text-zinc-300">{"{"}</span>
          </div>
        </div>

        {/* Line 2 - name */}
        <div className="flex items-center">
          <Ln n={2} />
          <span className="ml-4 text-[#9cdcfe]">name</span>
          <span className="text-zinc-400">:</span>{" "}
          <span className="text-[#ce9178]">&quot;</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name"
            disabled={isLoading}
            className="inline-block w-full max-w-[280px] border-none bg-transparent font-mono text-sm text-[#ce9178] placeholder:text-[#ce9178]/40 focus:outline-none"
            aria-label="Name"
          />
          <span className="ml-auto text-[#ce9178]">&quot;</span>
          <span className="text-zinc-400">,</span>
        </div>

        {/* Line 3 - email */}
        <div className="flex items-center">
          <Ln n={3} />
          <span className="ml-4 text-[#9cdcfe]">email</span>
          <span className="text-zinc-400">:</span>{" "}
          <span className="text-[#ce9178]">&quot;</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
            disabled={isLoading}
            className="inline-block w-full max-w-[280px] border-none bg-transparent font-mono text-sm text-[#ce9178] placeholder:text-[#ce9178]/40 focus:outline-none"
            aria-label="Email"
          />
          <span className="ml-auto text-[#ce9178]">&quot;</span>
          <span className="text-zinc-400">,</span>
        </div>

        {/* Line 4 - message */}
        <div className="flex items-start">
          <Ln n={4} />
          <span className="ml-4 text-[#9cdcfe]">message</span>
          <span className="text-zinc-400">:</span>{" "}
          <span className="text-[#ce9178]">&quot;</span>
        </div>
        <div className="ml-8 sm:ml-10">
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Let's build something cool..."
            disabled={isLoading}
            rows={3}
            className="w-full resize-none border-none bg-transparent font-mono text-sm text-[#ce9178] placeholder:text-[#ce9178]/40 focus:outline-none"
            aria-label="Message"
          />
        </div>
        <div className="ml-8 sm:ml-10">
          <span className="text-[#ce9178]">&quot;</span>
        </div>

        {/* Line 5 */}
        <div className="flex items-start">
          <Ln n={5} />
          <span className="text-zinc-300">{"}"}</span>
        </div>
      </div>

      {/* Run Script Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm font-medium transition-all",
            isLoading
              ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
              : "bg-zinc-200 text-zinc-900 shadow-sm hover:bg-white active:scale-[0.98]",
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Play className="size-4 fill-green-600 text-green-600" />
              Run Script
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function SuccessView({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 py-12">
      <CheckCircle2 className="size-16 text-green-500 animate-in zoom-in-50 fade-in duration-500" />
      <div className="space-y-2 text-center">
        <h3 className="font-mono text-xl font-semibold text-zinc-100">
          Message Sent!
        </h3>
        <p className="font-mono text-sm text-zinc-400">
          Function execution completed successfully.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 font-mono text-sm text-blue-400 underline underline-offset-4 transition-colors hover:text-blue-300"
      >
        reset_form()
      </button>
    </div>
  );
}

function SocialLinksView() {
  return (
    <div className="font-mono text-sm leading-relaxed sm:leading-8">
      <div className="flex items-start">
        <Ln n={1} />
        <div>
          <span className="text-[#569cd6]">export</span>{" "}
          <span className="text-[#569cd6]">const</span>{" "}
          <span className="text-[#dcdcaa]">socialLinks</span>{" "}
          <span className="text-zinc-400">=</span>{" "}
          <span className="text-zinc-300">[</span>
        </div>
      </div>
      {SOCIAL_LINKS.map((link, i) => (
        <div key={link.name}>
          <div className="flex items-start">
            <Ln n={2 + i * 4} />
            <span className="ml-4 text-zinc-300">{"{ "}</span>
          </div>
          <div className="flex items-start">
            <Ln n={3 + i * 4} />
            <span className="ml-8 text-[#9cdcfe]">name</span>
            <span className="text-zinc-400">:</span>{" "}
            <span className="text-[#ce9178]">&quot;{link.name}&quot;</span>
            <span className="text-zinc-400">,</span>
          </div>
          <div className="flex items-start">
            <Ln n={4 + i * 4} />
            <span className="ml-8 text-[#9cdcfe]">url</span>
            <span className="text-zinc-400">:</span>{" "}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ce9178] underline decoration-[#ce9178]/30 hover:decoration-[#ce9178]"
            >
              &quot;{link.url}&quot;
            </a>
            <span className="text-zinc-400">,</span>
          </div>
          <div className="flex items-start">
            <Ln n={5 + i * 4} />
            <span className="ml-4 text-zinc-300">{"}"},</span>
          </div>
        </div>
      ))}
      <div className="flex items-start">
        <Ln n={2 + SOCIAL_LINKS.length * 4} />
        <span className="text-zinc-300">];</span>
      </div>
    </div>
  );
}

function Ln({ n }: { n: number }) {
  return (
    <span className="mr-4 inline-block w-5 shrink-0 select-none text-right font-mono text-xs text-zinc-600 sm:mr-6 sm:text-sm">
      {n}
    </span>
  );
}
