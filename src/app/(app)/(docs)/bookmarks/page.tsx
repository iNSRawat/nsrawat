import { compareDesc } from "date-fns";
import type { Metadata } from "next";

import { StripedSeparator } from "@/components/striped-separator";
import { BookmarkCategorySection } from "@/features/portfolio/components/bookmarks/bookmark-category-section";
import { BOOKMARKS } from "@/features/portfolio/data/bookmarks";

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
  "Datasets",
  "Tools & Libraries",
  "Agents",
  "GitHub Repos",
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
      <div className="screen-line-after px-2 sm:px-4">
        <h1 className="text-2xl font-semibold sm:text-3xl">Bookmarks</h1>
      </div>

      <div className="p-2 sm:p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description as string}
        </p>
      </div>

      <StripedSeparator />

      {CATEGORY_ORDER.map((category) => {
        const items = grouped[category];
        if (!items || items.length === 0) return null;

        return (
          <div key={category}>
            <BookmarkCategorySection category={category} items={items} />
            <StripedSeparator />
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
