"use client";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BookmarkItem } from "@/features/portfolio/components/bookmarks/bookmark-item";
import type { Bookmark } from "@/features/portfolio/types/bookmarks";
import { cn } from "@/lib/utils";

const INITIAL_LIMIT = 8; // 4 rows x 2 columns = 8 resources

export function BookmarkCategorySection({
  category,
  items,
}: {
  category: string;
  items: Bookmark[];
}) {
  const hasMore = items.length > INITIAL_LIMIT;
  const initialItems = hasMore ? items.slice(0, INITIAL_LIMIT) : items;
  const remainingItems = hasMore ? items.slice(INITIAL_LIMIT) : [];

  return (
    <div>
      <div className="screen-line-after px-2 pt-2 sm:px-4">
        <h2 className="text-base font-semibold sm:text-lg">{category}</h2>
      </div>

      {hasMore ? (
        <Collapsible>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {initialItems.map((bookmark, i) => (
              <BookmarkItem
                key={bookmark.url}
                bookmark={bookmark}
                className={cn(
                  "border-b border-edge",
                  i % 2 === 0 ? "md:border-r" : "",
                )}
              />
            ))}
          </div>

          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {remainingItems.map((bookmark, i) => (
                <BookmarkItem
                  key={bookmark.url}
                  bookmark={bookmark}
                  className={cn(
                    "border-b border-edge",
                    i % 2 === 0 ? "md:border-r" : "",
                  )}
                />
              ))}
              {remainingItems.length % 2 !== 0 && (
                <div className="hidden border-b border-edge md:block" />
              )}
            </div>
          </CollapsibleContent>

          <div className="flex items-center justify-center border-b border-edge py-2 bg-background/25">
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "group/trigger h-7 gap-1.5 rounded-md border-edge bg-background/50 px-3",
                  "font-mono text-xs font-medium text-muted-foreground transition-all",
                  "hover:border-foreground/20 hover:bg-muted/50 hover:text-foreground cursor-pointer",
                )}
              >
                <span className="group-data-[state=open]/trigger:hidden">
                  See more ({remainingItems.length})
                </span>
                <span className="hidden group-data-[state=open]/trigger:inline">
                  See less
                </span>
                <ChevronDownIcon
                  className="size-3.5 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180"
                  aria-hidden
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2">
          {items.map((bookmark, i) => (
            <BookmarkItem
              key={bookmark.url}
              bookmark={bookmark}
              className={cn(
                "border-b border-edge",
                i % 2 === 0 ? "md:border-r" : "",
              )}
            />
          ))}
          {items.length % 2 !== 0 && (
            <div className="hidden border-b border-edge md:block" />
          )}
        </div>
      )}
    </div>
  );
}
