"use client";

import { compareDesc } from "date-fns";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  GlobeIcon,
  SearchIcon,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

import { getIcon, Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Bookmark } from "@/features/portfolio/types/bookmarks";
import { cn } from "@/lib/utils";

type SortOption = "latest" | "az";
const PAGE_SIZE = 30;

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

/**
 * Interleaves bookmarks round-robin across categories so the initial
 * view shows a balanced mix of items from every category equally.
 */
function interleaveCategories(
  items: Bookmark[],
  categoryOrder: string[],
): Bookmark[] {
  const groups: Record<string, Bookmark[]> = {};
  for (const cat of categoryOrder) {
    groups[cat] = [];
  }
  const otherItems: Bookmark[] = [];

  for (const item of items) {
    const cat = item.category || "Other";
    if (groups[cat]) {
      groups[cat].push(item);
    } else {
      otherItems.push(item);
    }
  }

  const activeCategories = categoryOrder.filter(
    (cat) => groups[cat] && groups[cat].length > 0,
  );

  const result: Bookmark[] = [];
  let addedInRound = true;
  let index = 0;

  while (addedInRound) {
    addedInRound = false;
    for (const cat of activeCategories) {
      if (index < groups[cat].length) {
        result.push(groups[cat][index]);
        addedInRound = true;
      }
    }
    index++;
  }

  result.push(...otherItems);
  return result;
}

function BookmarkFavicon({ bookmark }: { bookmark: Bookmark }) {
  const url = bookmark.url.toLowerCase();
  const domain = getDomain(bookmark.url);

  // 1. Explicit iconName if present in Icons
  if (bookmark.iconName && getIcon(bookmark.iconName)) {
    return (
      <span className="flex size-4 items-center justify-center text-muted-foreground transition-colors group-hover:text-foreground">
        {getIcon(bookmark.iconName)}
      </span>
    );
  }

  // 2. Specific brand logos matching reference screenshot
  if (url.includes("netflix.com")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-4 shrink-0 fill-[#E50914]"
        aria-hidden
      >
        <path d="M5.398 0v24c1.196-.206 2.39-.452 3.583-.736V0H5.398zm9.621 0v21.564c1.192-.379 2.385-.79 3.583-1.233V0h-3.583zm-4.81 0v1.076l3.583 14.65V0h-3.583z" />
      </svg>
    );
  }

  if (url.includes("apple.com") || url.includes("tv.apple.com")) {
    return (
      <Icons.apple className="size-3.5 shrink-0 fill-current text-muted-foreground group-hover:text-foreground" />
    );
  }

  if (url.includes("vercel.com") || url.includes("vercel.app")) {
    return (
      <Icons.vercel className="size-3.5 shrink-0 fill-current text-muted-foreground group-hover:text-foreground" />
    );
  }

  if (url.includes("github.com")) {
    return (
      <Icons.github className="size-3.5 shrink-0 fill-current text-muted-foreground group-hover:text-foreground" />
    );
  }

  if (url.includes("mubi.com")) {
    return (
      <span className="flex size-3.5 items-center justify-center font-black tracking-tighter text-[8px] text-muted-foreground group-hover:text-foreground">
        M
      </span>
    );
  }

  if (url.includes("departuremono.com")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-3.5 fill-current text-muted-foreground group-hover:text-foreground"
      >
        <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 6h4v4h-4v-4zM4 16h4v4H4v-4z" />
      </svg>
    );
  }

  if (url.includes("neal.fun")) {
    return <span className="text-xs leading-none">🧔</span>;
  }

  if (url.includes("mnmm.xyz")) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-3.5 stroke-current stroke-2 fill-none text-muted-foreground group-hover:text-foreground"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  if (url.includes("time.fyi")) {
    return (
      <span className="font-mono text-[11px] font-bold text-muted-foreground group-hover:text-foreground">
        7.
      </span>
    );
  }

  if (url.includes("lofree.co")) {
    return (
      <span className="font-mono text-[11px] font-black text-muted-foreground group-hover:text-foreground">
        0
      </span>
    );
  }

  if (url.includes("kaggle.com")) {
    return (
      <Icons.kaggle className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
    );
  }

  if (url.includes("huggingface.co")) {
    return (
      <Icons.huggingface className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
    );
  }

  if (url.includes("pytorch.org")) {
    return (
      <Icons.pytorch className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
    );
  }

  if (url.includes("tensorflow.org")) {
    return (
      <Icons.tensorflow className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
    );
  }

  if (url.includes("streamlit.io")) {
    return (
      <Icons.streamlit className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
    );
  }

  if (url.includes("jupyter.org")) {
    return (
      <Icons.jupyter className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
    );
  }

  if (url.includes("coursera.org")) {
    return (
      <Icons.coursera className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
    );
  }

  // 3. Fallback to Google Favicon service with crisp 128px resolution
  return (
    <span className="relative flex size-4 shrink-0 items-center justify-center">
      {}
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt=""
        className="size-3.5 rounded-[2px] object-contain opacity-85 transition-opacity group-hover:opacity-100"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <GlobeIcon
        className="hidden size-3 text-muted-foreground/60 transition-colors group-hover:text-foreground"
        aria-hidden
      />
    </span>
  );
}

export function BookmarksPageContent({
  bookmarks,
  categories,
}: {
  bookmarks: Bookmark[];
  categories: string[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [hoveredBookmark, setHoveredBookmark] = useState<Bookmark | null>(null);
  const [previewPos, setPreviewPos] = useState({
    x: 0,
    y: 0,
    isDockedLeft: true,
  });
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset pagination during render when search, category, or sort changes
  const [prevFilter, setPrevFilter] = useState({ search, category, sort });
  if (
    prevFilter.search !== search ||
    prevFilter.category !== category ||
    prevFilter.sort !== sort
  ) {
    setPrevFilter({ search, category, sort });
    setVisibleCount(PAGE_SIZE);
  }

  const filtered = useMemo(() => {
    let items = [...bookmarks];

    if (category !== "All") {
      items = items.filter((b) => b.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q) ||
          b.url.toLowerCase().includes(q) ||
          b.description?.toLowerCase().includes(q) ||
          b.category?.toLowerCase().includes(q),
      );
    }

    if (sort === "latest") {
      items.sort((a, b) =>
        compareDesc(new Date(a.bookmarkedAt), new Date(b.bookmarkedAt)),
      );
      // When in "All" with no search, balance initial items across all categories equally
      if (category === "All" && !search.trim()) {
        items = interleaveCategories(items, categories);
      }
    } else {
      items.sort((a, b) => a.title.localeCompare(b.title));
    }

    return items;
  }, [bookmarks, search, sort, category, categories]);

  const displayedBookmarks = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  const hasMore = visibleCount < filtered.length;

  const updatePreviewPosition = useCallback(
    (e: React.MouseEvent, rowElement?: HTMLElement) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const targetY = rowElement
        ? rowElement.getBoundingClientRect().top +
          rowElement.getBoundingClientRect().height / 2
        : e.clientY;

      const clampedY = Math.max(
        120,
        Math.min(window.innerHeight - 120, targetY),
      );
      const hasLeftSpace = rect.left >= 320;

      if (hasLeftSpace) {
        setPreviewPos({
          x: rect.left - 24,
          y: clampedY,
          isDockedLeft: true,
        });
      } else {
        setPreviewPos({
          x: Math.min(window.innerWidth - 300, e.clientX + 24),
          y: clampedY,
          isDockedLeft: false,
        });
      }
    },
    [],
  );

  const handleMouseEnter = useCallback(
    (bookmark: Bookmark, e: React.MouseEvent<HTMLAnchorElement>) => {
      setHoveredBookmark(bookmark);
      setImgError(false);
      updatePreviewPosition(e, e.currentTarget);
    },
    [updatePreviewPosition],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      updatePreviewPosition(e, e.currentTarget);
    },
    [updatePreviewPosition],
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredBookmark(null);
    setImgError(false);
  }, []);

  const previewImageSrc =
    hoveredBookmark?.previewImage ||
    (hoveredBookmark?.url
      ? `https://api.microlink.io/?url=${encodeURIComponent(
          hoveredBookmark.url,
        )}&screenshot=true&meta=false&embed=screenshot.url`
      : null);

  const showPreview = !!previewImageSrc && !imgError;

  return (
    <div
      ref={containerRef}
      className="relative w-full space-y-1.5 sm:space-y-2"
    >
      {/* Search + Sort + Filter bar (compact & responsive to all devices) */}
      <div className="flex items-center justify-between gap-1.5 xs:gap-2.5 py-0.5 sm:py-1">
        <div className="relative flex-1 min-w-0 max-w-[150px] xs:max-w-xs sm:max-w-sm">
          <SearchIcon className="absolute left-0 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search links"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              "w-full bg-transparent py-0.5 pl-4.5 pr-1.5 text-xs sm:py-1 sm:pl-5 sm:pr-2 sm:text-sm outline-none",
              "text-foreground placeholder:text-muted-foreground",
            )}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 text-muted-foreground",
                "cursor-pointer outline-none transition-colors hover:text-foreground",
              )}
            >
              <span className="text-[11px]">↕</span>
              <span>{sort === "latest" ? "Latest" : "A-Z"}</span>
              <ChevronDownIcon className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setSort("latest")}>
                Latest
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSort("az")}>
                A-Z
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Category dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 text-muted-foreground",
                "cursor-pointer outline-none transition-colors hover:text-foreground",
              )}
            >
              <span className="truncate max-w-[75px] xs:max-w-[120px] sm:max-w-none">
                {category}
              </span>
              <ChevronDownIcon className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setCategory("All")}>
                All
              </DropdownMenuItem>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat} onSelect={() => setCategory(cat)}>
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bookmark list (borderless, compact rows with rounded hover) */}
      {filtered.length === 0 ? (
        <div className="py-8 text-center sm:py-12">
          <p className="text-xs sm:text-sm text-muted-foreground">
            No bookmarks found.
          </p>
        </div>
      ) : (
        <div className="space-y-0.5">
          {displayedBookmarks.map((bookmark) => (
            <a
              key={bookmark.url}
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex items-center gap-2 sm:gap-3 rounded-md px-1.5 py-1 sm:px-2 sm:py-1.5",
                "transition-colors duration-150 hover:bg-muted/40",
              )}
              onMouseEnter={(e) => handleMouseEnter(bookmark, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Favicon / Icon */}
              <div className="flex size-4 shrink-0 items-center justify-center">
                <BookmarkFavicon bookmark={bookmark} />
              </div>

              {/* Title / Description */}
              <p className="min-w-0 flex-1 truncate text-xs sm:text-sm leading-snug">
                <span className="font-medium text-foreground transition-colors">
                  {bookmark.title}
                </span>
                {(bookmark.description || bookmark.author) && (
                  <span className="text-muted-foreground">
                    {" "}
                    <span className="mx-0.5 text-muted-foreground/40">
                      /
                    </span>{" "}
                    {bookmark.description || bookmark.author}
                  </span>
                )}
              </p>

              {/* Domain */}
              <span className="hidden shrink-0 font-mono text-[11px] text-muted-foreground/70 sm:block">
                {getDomain(bookmark.url)}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* See more / Show less button */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex w-full flex-col items-center justify-center gap-1.5 pt-2 pb-1 text-center">
          {hasMore ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className={cn(
                "mx-auto h-7 gap-1.5 rounded-md border-edge bg-background/50 px-3",
                "font-mono text-xs font-medium text-muted-foreground transition-all",
                "hover:border-foreground/30 hover:bg-muted/60 hover:text-foreground cursor-pointer shadow-xs",
              )}
            >
              <span>See more ({filtered.length - visibleCount} remaining)</span>
              <ChevronDownIcon className="size-3.5" aria-hidden />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setVisibleCount(PAGE_SIZE);
                containerRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className={cn(
                "mx-auto h-7 gap-1.5 rounded-md border-edge bg-background/50 px-3",
                "font-mono text-xs font-medium text-muted-foreground transition-all",
                "hover:border-foreground/30 hover:bg-muted/60 hover:text-foreground cursor-pointer shadow-xs",
              )}
            >
              <span>Show less</span>
              <ChevronUpIcon className="size-3.5" aria-hidden />
            </Button>
          )}

          <p className="w-full text-center font-mono text-[11px] text-muted-foreground">
            {hasMore
              ? `Showing ${displayedBookmarks.length} of ${filtered.length} links`
              : `Showing all ${filtered.length} links`}
          </p>
        </div>
      )}
      {filtered.length > 0 && filtered.length <= PAGE_SIZE && (
        <div className="w-full pt-2 pb-1 text-center">
          <p className="w-full text-center font-mono text-[11px] text-muted-foreground">
            Showing all {filtered.length} links
          </p>
        </div>
      )}

      {/* Hover image preview card (hidden on touch/small screens, smooth on desktop) */}
      {showPreview && previewImageSrc && (
        <div
          className="pointer-events-none fixed z-50 hidden lg:block transition-all duration-150 ease-out"
          style={{
            top: previewPos.y,
            left: previewPos.x,
            transform: previewPos.isDockedLeft
              ? "translate(-100%, -50%)"
              : "translate(0%, -50%)",
          }}
          aria-hidden
        >
          <div className="animate-in fade-in-0 zoom-in-95 duration-150">
            <div className="w-64 sm:w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#121214]/95 p-1.5 shadow-2xl backdrop-blur-xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted/40">
                {}
                <img
                  src={previewImageSrc}
                  alt={hoveredBookmark?.title || ""}
                  className="size-full object-cover"
                  onError={() => setImgError(true)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
