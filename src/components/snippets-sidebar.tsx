"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { cn } from "@/lib/utils";

export type SidebarSnippetItem = {
  slug: string;
  title: string;
  isComponent?: boolean;
};

interface SnippetsSidebarProps {
  items: SidebarSnippetItem[];
}

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener("snippets-sidebar-toggle", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("snippets-sidebar-toggle", callback);
  };
};

const getSnapshot = (): boolean => {
  try {
    const stored = localStorage.getItem("snippetsSidebarOpen");
    return stored !== null ? JSON.parse(stored) === true : true;
  } catch {
    return true;
  }
};

const getServerSnapshot = (): boolean => true;

export function SnippetsSidebar({ items }: SnippetsSidebarProps) {
  const pathname = usePathname();
  const isOpen = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const activeItemRef = React.useRef<HTMLAnchorElement | null>(null);

  const toggleSidebar = () => {
    try {
      const current = getSnapshot();
      localStorage.setItem("snippetsSidebarOpen", JSON.stringify(!current));
      window.dispatchEvent(new Event("snippets-sidebar-toggle"));
    } catch {
      // Ignore
    }
  };

  // Auto-scroll active item into view
  React.useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return (
    // Desktop only (>= xl). On mobile and tablet, this is completely hidden.
    <div className="hidden xl:block">
      {/* Toggle Button when sidebar is collapsed */}
      {!isOpen && (
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
          className="fixed top-20 left-4 z-40 flex size-7 items-center justify-center rounded-lg border border-edge bg-background/95 text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-muted hover:text-foreground active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="size-4"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="3"
              width="20"
              height="18"
              rx="4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="5"
              y="6"
              width="2"
              height="12"
              rx="1"
              fill="currentColor"
            />
          </svg>
        </button>
      )}

      {/* Docked Sidebar on the Left Side */}
      {isOpen && (
        <div
          aria-label="Component and snippet navigation"
          className="fixed top-20 left-4 z-40 flex h-[calc(100vh-6rem)] w-60 flex-col rounded-2xl border border-edge bg-background/95 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-left-3 duration-200 dark:shadow-black/60"
        >
          {/* Toggle Button in Top-Left of Sidebar */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
              className="flex size-7 items-center justify-center rounded-lg border border-edge bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="size-4"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="18"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="5"
                  y="6"
                  width="6"
                  height="12"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable Tick-Line Navigation Track */}
          <div className="no-scrollbar grow overflow-x-hidden overflow-y-auto overscroll-contain pt-11">
            <div className="flex flex-col gap-2 py-4 pr-2 pl-3">
              {items.map((item) => {
                const href = `/snippets/${item.slug}`;
                const isActive = pathname === href;

                return (
                  <React.Fragment key={item.slug}>
                    <Link
                      ref={isActive ? activeItemRef : null}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className="group relative flex h-px items-center gap-3 py-1 outline-hidden after:absolute after:top-1/2 after:left-0 after:size-full after:-translate-y-1/2 after:p-3"
                    >
                      {/* Tick mark line */}
                      <span
                        className={cn(
                          "block h-px shrink-0 transition-all duration-200",
                          isActive
                            ? "w-10 bg-foreground"
                            : "w-6 bg-foreground/20 group-hover:w-8 group-hover:bg-foreground",
                        )}
                      />
                      {/* Item label */}
                      <span
                        className={cn(
                          "truncate text-sm whitespace-nowrap transition-colors",
                          isActive
                            ? "font-medium text-foreground"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        {item.title}
                        {item.isComponent && (
                          <span
                            className="ml-1.5 inline-block size-1.5 -translate-y-px rounded-full bg-blue-500"
                            title="Component"
                          />
                        )}
                      </span>
                    </Link>

                    {/* Two subtle tick lines between items (Chanhdai signature ruler style) */}
                    <span className="block h-px w-6 bg-foreground/20" />
                    <span className="block h-px w-6 bg-foreground/20" />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
