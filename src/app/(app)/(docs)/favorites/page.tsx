import type { Metadata } from "next";

import { StripedSeparator } from "@/components/striped-separator";
import { FavoritesPageContent } from "@/features/portfolio/components/favorites/favorites-page-content";
import { FAVORITES } from "@/features/portfolio/data/favorites";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "A curated collection of inspiring products, people, movies, and websites discovered across the internet and the real world.",
};

export default function FavoritesPage() {
  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-2 py-1 sm:px-4 sm:py-1.5">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
          Favorites
        </h1>
      </div>

      <div className="screen-line-after px-2 py-1 sm:px-4 sm:py-1.5">
        <p className="font-mono text-xs sm:text-sm text-balance text-muted-foreground leading-normal sm:leading-relaxed">
          A curated collection of inspiring products, people, movies, and
          websites discovered across the internet and the real world.
        </p>
      </div>

      <StripedSeparator />

      <div className="screen-line-after px-2 pt-1.5 pb-1 sm:px-4 sm:pt-2 sm:pb-1.5">
        <FavoritesPageContent favorites={FAVORITES} />
      </div>

      <StripedSeparator />
    </div>
  );
}
