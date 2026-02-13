import { compareDesc } from "date-fns";
import Link from "next/link";

import { CollapsibleList } from "@/components/collapsible-list";

import { BOOKMARKS } from "../../data/bookmarks";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { BookmarkItem } from "./bookmark-item";

const SORTED_BOOKMARKS = [...BOOKMARKS].sort((a, b) => {
  return compareDesc(new Date(a.bookmarkedAt), new Date(b.bookmarkedAt));
});

export function Bookmarks() {
  return (
    <Panel id="bookmarks">
      <PanelHeader>
        <PanelTitle>Bookmarks</PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={SORTED_BOOKMARKS}
        max={6}
        renderItem={(item) => <BookmarkItem bookmark={item} />}
      />

      <div className="flex h-12 items-center justify-center border-t border-edge">
        <Link
          href="/bookmarks"
          className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View All →
        </Link>
      </div>
    </Panel>
  );
}
