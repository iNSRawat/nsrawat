"use client";

import {
  ArrowDownAZIcon,
  ChevronDownIcon,
  ClockIcon,
  GlobeIcon,
  SearchIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  Favorite,
  FavoriteCategory,
} from "@/features/portfolio/types/favorites";
import { cn } from "@/lib/utils";

type SortOption = "latest" | "az";

type CategoryFilter =
  "All" | "Products" | "People" | "Sites" | "Fonts" | "Movies";

const CATEGORY_MAP: Record<CategoryFilter, FavoriteCategory | null> = {
  All: null,
  Products: "Product",
  People: "People",
  Sites: "Site",
  Fonts: "Font",
  Movies: "Movie",
};

const CATEGORIES: CategoryFilter[] = [
  "All",
  "Products",
  "People",
  "Sites",
  "Fonts",
  "Movies",
];

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function FavoriteFavicon({ favorite }: { favorite: Favorite }) {
  const [hasError, setHasError] = useState(false);
  const domain = getDomain(favorite.url);

  if (hasError) {
    return (
      <GlobeIcon
        className="size-3 text-muted-foreground/60 transition-colors group-hover:text-foreground"
        aria-hidden
      />
    );
  }

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
      alt=""
      className="size-3.5 rounded-[2px] object-contain opacity-85 transition-opacity group-hover:opacity-100"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

export function FavoritesPageContent({ favorites }: { favorites: Favorite[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.get("sort") === "az") {
          return "az";
        }
      } catch {}
    }
    return "latest";
  });
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("All");

  const [hoveredFavorite, setHoveredFavorite] = useState<Favorite | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    try {
      const url = new URL(window.location.href);
      if (newSort === "az") {
        url.searchParams.set("sort", "az");
      } else {
        url.searchParams.delete("sort");
      }
      window.history.replaceState(null, "", url.toString());
    } catch {}
  };

  const filteredFavorites = useMemo(() => {
    let items = [...favorites];

    const targetCategory = CATEGORY_MAP[selectedCategory];
    if (targetCategory) {
      items = items.filter((item) => item.category === targetCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.url.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      );
    }

    if (sort === "latest") {
      items.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }, [favorites, selectedCategory, search, sort]);

  // Dismiss preview smoothly on page scroll
  useEffect(() => {
    const handleScroll = () => {
      setHoveredFavorite(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Position floating preview relative to mouse cursor (desktop mouse only)
  const updateCursorPosition = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      if (e.pointerType !== "mouse") return;

      const cardWidth = 250;
      const cardHeight = 156;
      const offset = 20;

      const fitsRight =
        e.clientX + offset + cardWidth <= window.innerWidth - 16;
      const x = fitsRight
        ? e.clientX + offset
        : Math.max(16, e.clientX - offset - cardWidth);
      const y = Math.min(
        Math.max(e.clientY - cardHeight / 2, 16),
        window.innerHeight - cardHeight - 16,
      );

      setCursorPos({ x, y });
    },
    [],
  );

  const handlePointerEnter = useCallback(
    (item: Favorite, e: React.PointerEvent<HTMLAnchorElement>) => {
      if (e.pointerType !== "mouse") return;
      setHoveredFavorite(item);
      setImgError(false);
      updateCursorPosition(e);
    },
    [updateCursorPosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      updateCursorPosition(e);
    },
    [updateCursorPosition],
  );

  const handlePointerLeave = useCallback(() => {
    setHoveredFavorite(null);
    setImgError(false);
  }, []);

  const previewImageSrc =
    hoveredFavorite?.previewImageUrl ||
    (hoveredFavorite?.url
      ? `https://api.microlink.io/?url=${encodeURIComponent(
          hoveredFavorite.url,
        )}&screenshot=true&meta=false&embed=screenshot.url`
      : null);

  const showPreview = !!previewImageSrc && !imgError;

  return (
    <div className="relative w-full space-y-1.5 sm:space-y-2">
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
              <DropdownMenuItem onSelect={() => handleSortChange("latest")}>
                <ClockIcon className="mr-1.5 size-3.5 opacity-60" />
                Latest
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSortChange("az")}>
                <ArrowDownAZIcon className="mr-1.5 size-3.5 opacity-60" />
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
                {selectedCategory}
              </span>
              <ChevronDownIcon className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {CATEGORIES.map((cat) => (
                <DropdownMenuItem
                  key={cat}
                  onSelect={() => setSelectedCategory(cat)}
                  className={cn(
                    selectedCategory === cat && "font-semibold text-foreground",
                  )}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Favorites list (minimum space between rows) */}
      {filteredFavorites.length === 0 ? (
        <div className="py-6 text-center sm:py-8">
          <p className="text-xs sm:text-sm text-muted-foreground">
            No favorites found.
          </p>
        </div>
      ) : (
        <div
          className={cn(
            "space-y-0.5",
            hoveredFavorite && "[&>a]:opacity-45 hover:[&>a:hover]:opacity-100",
          )}
        >
          {filteredFavorites.map((item) => {
            const domain = getDomain(item.url);
            const isHovered = hoveredFavorite?.id === item.id;

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel={`noopener noreferrer${item.nofollow ? " nofollow" : ""}`}
                className={cn(
                  "group flex items-center gap-2 sm:gap-3 rounded-md px-1.5 py-1 sm:px-2 sm:py-1.5",
                  "transition-colors duration-150 hover:bg-muted/40",
                  isHovered && "opacity-100! bg-muted/40",
                )}
                onPointerEnter={(e) => handlePointerEnter(item, e)}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              >
                {/* Favicon */}
                <div className="flex size-4 shrink-0 items-center justify-center">
                  <FavoriteFavicon favorite={item} />
                </div>

                {/* Title / Description */}
                <p className="min-w-0 flex-1 truncate text-xs sm:text-sm leading-snug">
                  <span className="font-medium text-foreground transition-colors group-hover:underline underline-offset-4">
                    {item.name}
                  </span>
                  {item.description && (
                    <span className="text-muted-foreground">
                      {" "}
                      <span className="mx-0.5 text-muted-foreground/40">
                        /
                      </span>{" "}
                      {item.description}
                    </span>
                  )}
                </p>

                {/* Domain & optional secondary watch link */}
                <div className="hidden shrink-0 items-center gap-1.5 font-mono text-[11px] text-muted-foreground/70 sm:flex">
                  <span>{domain}</span>
                  {item.secondaryUrl && (
                    <>
                      <span className="text-muted-foreground/30">·</span>
                      <span
                        role="link"
                        tabIndex={0}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(
                            item.secondaryUrl!.url,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(
                              item.secondaryUrl!.url,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          }
                        }}
                        className="transition-colors hover:text-foreground hover:underline cursor-pointer"
                        title={`Also on ${item.secondaryUrl.name}`}
                      >
                        {getDomain(item.secondaryUrl.url)}
                      </span>
                    </>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Footer Traffic Light Accent Dots */}
      <div className="flex items-center justify-center gap-2 pt-3 pb-1">
        <span className="size-1.5 rounded-full bg-[#E9573F] opacity-70" />
        <span className="size-1.5 rounded-full bg-[#F0BF2E] opacity-70" />
        <span className="size-1.5 rounded-full bg-[#4E964E] opacity-70" />
      </div>

      {/* Hover image preview card (hidden on touch/small screens, smooth on desktop) */}
      {showPreview && previewImageSrc && (
        <div
          className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block transition-transform duration-75 ease-out will-change-transform"
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
          }}
          aria-hidden
        >
          <div className="animate-in fade-in-0 zoom-in-95 duration-150">
            <div className="w-[250px] overflow-hidden rounded-xl border border-border/80 bg-popover/95 p-1.5 shadow-2xl backdrop-blur-xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted/40">
                <img
                  src={previewImageSrc}
                  alt={hoveredFavorite?.name || ""}
                  referrerPolicy="no-referrer"
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
