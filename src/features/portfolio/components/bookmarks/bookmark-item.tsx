import { format } from "date-fns";
import { ArrowUpRightIcon, BookmarkIcon } from "lucide-react";

import { getIcon } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import type { Bookmark } from "@/features/portfolio/types/bookmarks";
import { cn } from "@/lib/utils";

export function BookmarkItem({
  className,
  bookmark,
}: {
  className?: string;
  bookmark: Bookmark;
}) {
  return (
    <a
      className={cn(
        "group/bookmark flex items-center gap-3 bg-background/50 px-3 py-3 transition-colors hover:bg-muted/50 sm:px-6 sm:py-4",
        className,
      )}
      href={bookmark.url}
      target="_blank"
      rel="noopener"
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg select-none",
          "border border-edge bg-background/50 text-muted-foreground transition-colors",
          "group-hover/bookmark:border-foreground/20 group-hover/bookmark:text-foreground",
          "[&_svg]:size-5",
        )}
        aria-hidden
      >
        {getIcon(bookmark.iconName) ?? <BookmarkIcon />}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground/80 transition-colors group-hover/bookmark:text-foreground truncate">
          {bookmark.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
          {bookmark.author && (
            <>
              <dl>
                <dt className="sr-only">Author</dt>
                <dd>{bookmark.author}</dd>
              </dl>

              <Separator
                className="data-[orientation=vertical]:h-3"
                orientation="vertical"
              />
            </>
          )}

          <dl>
            <dt className="sr-only">Bookmarked on</dt>
            <dd>
              <time dateTime={new Date(bookmark.bookmarkedAt).toISOString()}>
                {format(new Date(bookmark.bookmarkedAt), "dd.MM.yyyy")}
              </time>
            </dd>
          </dl>
        </div>
      </div>

      <ArrowUpRightIcon
        className="size-4 shrink-0 text-muted-foreground transition-colors group-hover/bookmark:text-foreground"
        aria-hidden
      />
    </a>
  );
}
