import { compareDesc } from "date-fns";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { BOOKMARKS } from "../../data/bookmarks";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { BookmarkItem } from "./bookmark-item";

const HOMEPAGE_CATEGORIES = ["Research & Papers", "Blogs & Communities"];

const SORTED_BOOKMARKS = [...BOOKMARKS]
  .filter((b) => HOMEPAGE_CATEGORIES.includes(b.category || ""))
  .sort((a, b) => {
    return compareDesc(new Date(a.bookmarkedAt), new Date(b.bookmarkedAt));
  });

export function Bookmarks() {
  return (
    <Panel id="bookmarks">
      <PanelHeader>
        <PanelTitle>Bookmarks</PanelTitle>
      </PanelHeader>

      {SORTED_BOOKMARKS.slice(0, 6).map((item) => (
        <BookmarkItem
          key={item.url}
          bookmark={item}
          className="border-b border-edge"
        />
      ))}

      <div className="flex h-12 items-center justify-center pb-px">
        <Button asChild variant="default">
          <Link href="/bookmarks">
            View All
            <ArrowRightIcon aria-hidden />
          </Link>
        </Button>
      </div>
    </Panel>
  );
}
