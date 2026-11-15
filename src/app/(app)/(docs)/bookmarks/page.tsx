import type { Metadata } from "next";

import { StripedSeparator } from "@/components/striped-separator";
import { BookmarksPageContent } from "@/features/portfolio/components/bookmarks/bookmarks-page-content";
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
  "Books",
  "Podcasts",
  "Newsletters",
  "Online Communities",
];

export default function BookmarksPage() {
  const categories = CATEGORY_ORDER.filter((cat) =>
    BOOKMARKS.some((b) => b.category === cat),
  );

  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-2 py-1 sm:px-4 sm:py-1.5">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
          Bookmarks
        </h1>
      </div>

      <div className="screen-line-after px-2 py-1 sm:px-4 sm:py-1.5">
        <p className="font-mono text-xs sm:text-sm text-balance text-muted-foreground leading-normal sm:leading-relaxed">
          {metadata.description as string}
        </p>
      </div>

      <StripedSeparator />

      <div className="screen-line-after px-2 pt-1.5 pb-1 sm:px-4 sm:pt-2 sm:pb-1.5">
        <BookmarksPageContent bookmarks={BOOKMARKS} categories={categories} />
      </div>

      <StripedSeparator />
    </div>
  );
}
