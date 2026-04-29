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

// Theme-aware color classes
const t = {
  // Editor backgrounds
  editorBg: "bg-white dark:bg-[#1e1e1e]",
  sidebarBg: "bg-zinc-50 dark:bg-[#252526]",
  // Borders
  border: "border-zinc-200 dark:border-zinc-700/60",
  // Title bar text
  breadcrumb: "text-zinc-500 dark:text-zinc-500",
  breadcrumbActive: "text-zinc-800 dark:text-zinc-300",
  searchBg:
    "border-zinc-200 bg-zinc-100 dark:border-zinc-700/50 dark:bg-zinc-800/50",
  // Activity bar icons
  iconActive: "text-zinc-700 dark:text-zinc-300",
  iconMuted: "text-zinc-400 dark:text-zinc-500",
  // Explorer text
  explorerLabel: "text-zinc-500 dark:text-zinc-400",
  folderText: "text-zinc-500 dark:text-zinc-400",
  folderActive: "text-zinc-800 dark:text-zinc-300",
  fileActive: "bg-blue-50 text-zinc-900 dark:bg-zinc-700/40 dark:text-white",
  fileInactive:
    "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300",
  projectName: "text-teal-700 dark:text-[#4ec9b0]",
  // Tab text
  tabActive: "text-zinc-900 dark:text-zinc-200",
  tabInactive: "text-zinc-400 dark:text-zinc-500",
  tabActiveBg: "bg-white dark:bg-[#1e1e1e]",
  // Code syntax
  keyword: "text-blue-700 dark:text-[#569cd6]",
  fn: "text-amber-700 dark:text-[#dcdcaa]",
  variable: "text-sky-700 dark:text-[#9cdcfe]",
  string: "text-orange-700 dark:text-[#ce9178]",
  stringPlaceholder:
    "placeholder:text-orange-400/50 dark:placeholder:text-[#ce9178]/40",
  punctuation: "text-zinc-500 dark:text-zinc-400",
  brace: "text-zinc-700 dark:text-zinc-300",
  // Line numbers
  lineNum: "text-zinc-300 dark:text-zinc-600",
  // Button
  btnBg:
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white",
  btnDisabled:
    "cursor-not-allowed bg-zinc-200 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-400",
  // Success
  successTitle: "text-zinc-900 dark:text-zinc-100",
  successText: "text-zinc-500 dark:text-zinc-400",
  // X close icons
  closeActive: "text-zinc-400 dark:text-zinc-500",
  closeInactive: "text-zinc-300 dark:text-zinc-600",
};

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
    <div
      className={cn(
        "mx-auto w-full max-w-4xl overflow-hidden rounded-xl border shadow-2xl",
        t.editorBg,
        t.border,
      )}
    >
      {/* Title Bar */}
      <div
        className={cn(
          "flex items-center justify-between border-b px-3 py-2 sm:px-4",
          t.editorBg,
          t.border,
        )}
      >
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-[#ff5f57]" />
          <div className="size-3 rounded-full bg-[#febc2e]" />
          <div className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="hidden items-center gap-1.5 font-mono text-xs sm:flex">
          <span className={t.breadcrumb}>portfolio</span>
          <ChevronRight className={cn("size-3", t.closeInactive)} />
          <span className={t.breadcrumb}>src</span>
          <ChevronRight className={cn("size-3", t.closeInactive)} />
          <span className={t.breadcrumbActive}>
            {activeFile === "contact" ? "contact.tsx" : "socialLinks.tsx"}
          </span>
        </div>
        <div
          className={cn(
            "hidden items-center gap-2 rounded-md border px-2.5 py-1 sm:flex",
            t.searchBg,
          )}
        >
          <Search className={cn("size-3", t.iconMuted)} />
          <span className={cn("font-mono text-xs", t.breadcrumb)}>
            portfolio
          </span>
        </div>
      </div>

      <div className="flex">
        {/* Activity Bar */}
        <div
          className={cn(
            "hidden flex-col items-center justify-between border-r py-2 md:flex md:w-10",
            t.editorBg,
            t.border,
          )}
        >
          <div className="flex flex-col items-center gap-3">
            <Files className={cn("size-4", t.iconActive)} />
            <Search className={cn("size-4", t.iconMuted)} />
            <GitBranch className={cn("size-4", t.iconMuted)} />
            <Blocks className={cn("size-4", t.iconMuted)} />
          </div>
          <Settings className={cn("size-4", t.iconMuted)} />
        </div>

        {/* Sidebar / Explorer */}
        <div
          className={cn(
            "hidden w-40 shrink-0 border-r lg:block",
            t.sidebarBg,
            t.border,
          )}
        >
          <div className="px-4 py-2.5">
            <span
              className={cn(
                "font-mono text-[11px] font-semibold tracking-wider",
                t.explorerLabel,
              )}
            >
              EXPLORER
            </span>
          </div>
          <div className="space-y-0.5 px-2 text-[13px]">
            <div
              className={cn(
                "flex items-center gap-1.5 px-1 font-mono",
                t.projectName,
              )}
            >
              <ChevronRight className="size-3" />
              <span className="text-xs font-semibold tracking-wide">
                PORTFOLIO
              </span>
            </div>
            <div
              className={cn(
                "ml-4 flex items-center gap-1.5 px-1 py-0.5",
                t.folderText,
              )}
            >
              <FolderClosed className={cn("size-3.5", t.iconMuted)} />
              <span className="font-mono text-xs">.next</span>
            </div>
            <div
              className={cn(
                "ml-4 flex items-center gap-1.5 px-1 py-0.5",
                t.folderActive,
              )}
            >
              <FolderOpen className={cn("size-3.5", t.folderText)} />
              <span className="font-mono text-xs">src</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveFile("contact")}
              className={cn(
                "ml-8 flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left",
                activeFile === "contact" ? t.fileActive : t.fileInactive,
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
                activeFile === "socialLinks" ? t.fileActive : t.fileInactive,
              )}
            >
              <FileCode2 className="size-3.5 text-yellow-500" />
              <span className="font-mono text-xs">socialLinks.tsx</span>
            </button>
            <div
              className={cn(
                "ml-8 flex items-center gap-1.5 px-1 py-0.5",
                t.folderText,
              )}
            >
              <FileText className="size-3.5 text-purple-400" />
              <span className="font-mono text-xs">globals.css</span>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex min-h-[320px] flex-1 flex-col overflow-hidden">
          {/* Editor Tabs */}
          <div className={cn("flex border-b", t.sidebarBg, t.border)}>
            <button
              type="button"
              onClick={() => setActiveFile("contact")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 border-b-2 sm:gap-2 sm:px-4 sm:py-2",
                activeFile === "contact"
                  ? cn("border-blue-500", t.tabActiveBg)
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
                  activeFile === "contact" ? t.tabActive : t.tabInactive,
                )}
              >
                contact.tsx
              </span>
              <X
                className={cn(
                  "size-3",
                  activeFile === "contact" ? t.closeActive : t.closeInactive,
                )}
              />
            </button>
            <button
              type="button"
              onClick={() => setActiveFile("socialLinks")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 border-b-2 sm:gap-2 sm:px-4 sm:py-2",
                activeFile === "socialLinks"
                  ? cn("border-blue-500", t.tabActiveBg)
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
                  activeFile === "socialLinks" ? t.tabActive : t.tabInactive,
                )}
              >
                socialLinks.tsx
              </span>
              <X
                className={cn(
                  "size-3",
                  activeFile === "socialLinks"
                    ? t.closeActive
                    : t.closeInactive,
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
            <span className={t.keyword}>const</span>{" "}
            <span className={t.fn}>sendMessage</span>{" "}
            <span className={t.punctuation}>=</span>{" "}
            <span className={t.keyword}>async</span>{" "}
            <span className={t.brace}>(</span>
            <span className={t.variable}>data</span>
            <span className={t.brace}>)</span>{" "}
            <span className={t.keyword}>=&gt;</span>{" "}
            <span className={t.brace}>{"{"}</span>
          </div>
        </div>

        {/* Line 2 - name */}
        <div className="flex items-center">
          <Ln n={2} />
          <span className={cn("ml-4", t.variable)}>name</span>
          <span className={t.punctuation}>:</span>{" "}
          <span className={t.string}>&quot;</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name"
            disabled={isLoading}
            className={cn(
              "inline-block w-full max-w-[280px] border-none bg-transparent font-mono text-sm focus:outline-none",
              t.string,
              t.stringPlaceholder,
            )}
            aria-label="Name"
          />
          <span className={cn("ml-auto", t.string)}>&quot;</span>
          <span className={t.punctuation}>,</span>
        </div>

        {/* Line 3 - email */}
        <div className="flex items-center">
          <Ln n={3} />
          <span className={cn("ml-4", t.variable)}>email</span>
          <span className={t.punctuation}>:</span>{" "}
          <span className={t.string}>&quot;</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
            disabled={isLoading}
            className={cn(
              "inline-block w-full max-w-[280px] border-none bg-transparent font-mono text-sm focus:outline-none",
              t.string,
              t.stringPlaceholder,
            )}
            aria-label="Email"
          />
          <span className={cn("ml-auto", t.string)}>&quot;</span>
          <span className={t.punctuation}>,</span>
        </div>

        {/* Line 4 - message */}
        <div className="flex items-start">
          <Ln n={4} />
          <span className={cn("ml-4", t.variable)}>message</span>
          <span className={t.punctuation}>:</span>{" "}
          <span className={t.string}>&quot;</span>
        </div>
        <div className="ml-8 sm:ml-10">
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Let's build something cool..."
            disabled={isLoading}
            rows={3}
            className={cn(
              "w-full resize-none border-none bg-transparent font-mono text-sm focus:outline-none",
              t.string,
              t.stringPlaceholder,
            )}
            aria-label="Message"
          />
        </div>
        <div className="ml-8 sm:ml-10">
          <span className={t.string}>&quot;</span>
        </div>

        {/* Line 5 */}
        <div className="flex items-start">
          <Ln n={5} />
          <span className={t.brace}>{"}"}</span>
        </div>
      </div>

      {/* Run Script Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm font-medium transition-all active:scale-[0.98]",
            isLoading ? t.btnDisabled : cn(t.btnBg, "shadow-sm"),
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
        <h3 className={cn("font-mono text-xl font-semibold", t.successTitle)}>
          Message Sent!
        </h3>
        <p className={cn("font-mono text-sm", t.successText)}>
          Function execution completed successfully.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 font-mono text-sm text-blue-500 underline underline-offset-4 transition-colors hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
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
          <span className={t.keyword}>export</span>{" "}
          <span className={t.keyword}>const</span>{" "}
          <span className={t.fn}>socialLinks</span>{" "}
          <span className={t.punctuation}>=</span>{" "}
          <span className={t.brace}>[</span>
        </div>
      </div>
      {SOCIAL_LINKS.map((link, i) => (
        <div key={link.name}>
          <div className="flex items-start">
            <Ln n={2 + i * 4} />
            <span className={cn("ml-4", t.brace)}>{"{ "}</span>
          </div>
          <div className="flex items-start">
            <Ln n={3 + i * 4} />
            <span className={cn("ml-8", t.variable)}>name</span>
            <span className={t.punctuation}>:</span>{" "}
            <span className={t.string}>&quot;{link.name}&quot;</span>
            <span className={t.punctuation}>,</span>
          </div>
          <div className="flex items-start">
            <Ln n={4 + i * 4} />
            <span className={cn("ml-8", t.variable)}>url</span>
            <span className={t.punctuation}>:</span>{" "}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                t.string,
                "underline decoration-current/30 hover:decoration-current",
              )}
            >
              &quot;{link.url}&quot;
            </a>
            <span className={t.punctuation}>,</span>
          </div>
          <div className="flex items-start">
            <Ln n={5 + i * 4} />
            <span className={cn("ml-4", t.brace)}>{"}"},</span>
          </div>
        </div>
      ))}
      <div className="flex items-start">
        <Ln n={2 + SOCIAL_LINKS.length * 4} />
        <span className={t.brace}>];</span>
      </div>
    </div>
  );
}

function Ln({ n }: { n: number }) {
  return (
    <span
      className={cn(
        "mr-4 inline-block w-5 shrink-0 select-none text-right font-mono text-xs sm:mr-6 sm:text-sm",
        t.lineNum,
      )}
    >
      {n}
    </span>
  );
}
