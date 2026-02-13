import { compareDesc } from "date-fns";
import type { Metadata } from "next";

import { BookmarkItem } from "@/features/portfolio/components/bookmarks/bookmark-item";
import { BOOKMARKS } from "@/features/portfolio/data/bookmarks";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bookmarks",
  description:
    "A curated collection of Data Science, Machine Learning, and AI resources bookmarked by N S Rawat.",
};

const CATEGORY_ORDER = [
  "Learning Platforms",
  "Libraries & Frameworks",
  "Research & Papers",
  "Visualization & Tools",
  "Blogs & Communities",
];

function groupByCategory(bookmarks: typeof BOOKMARKS) {
  const groups: Record<string, typeof BOOKMARKS> = {};

  for (const bookmark of bookmarks) {
    const category = bookmark.category || "Other";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(bookmark);
  }

  // Sort each group by date descending
  for (const key of Object.keys(groups)) {
    groups[key].sort((a, b) =>
      compareDesc(new Date(a.bookmarkedAt), new Date(b.bookmarkedAt)),
    );
  }

  return groups;
}

export default function BookmarksPage() {
  const grouped = groupByCategory(BOOKMARKS);

  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">Bookmarks</h1>
      </div>

      <div className="p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description as string}
        </p>
      </div>

      <Separator />

      {CATEGORY_ORDER.map((category) => {
        const items = grouped[category];
        if (!items || items.length === 0) return null;

        return (
          <div key={category}>
            <div className="screen-line-after px-4 pt-2">
              <h2 className="text-lg font-semibold">{category}</h2>
            </div>

            <div>
              {items.map((bookmark) => (
                <BookmarkItem
                  key={bookmark.url}
                  bookmark={bookmark}
                  className="border-b border-edge"
                />
              ))}
            </div>

            <Separator />
          </div>
        );
      })}

      <div className="p-4 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          More resources coming soon.
        </p>
      </div>

      <div className="h-4" />
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className,
      )}
    />
  );
}
