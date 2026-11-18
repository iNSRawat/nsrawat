import type { Metadata } from "next";

import { StripedSeparator } from "@/components/striped-separator";
import { ArrowIcon } from "@/features/books/components/arrow-icon";
import { BooksWall } from "@/features/books/components/books-shelf";
import { BOOKS } from "@/features/books/data/books";

export const metadata: Metadata = {
  title: "Books I’ve read",
  description:
    "What I’ve read, what I’m reading and what’s next, kept with the thoughts that stayed with me.",
  openGraph: {
    title: "Books I’ve read · N S Rawat",
    description: "A shelf of finished books and the notes that stayed with me.",
  },
};

export default function BooksPage() {
  return (
    <div className="screen-line-x mx-auto min-h-svh md:max-w-4xl">
      <StripedSeparator />

      {/* Header matching whole website style (like bookmarks, notes, blog) */}
      <div className="screen-line-after px-2 sm:px-4">
        <h1 className="text-2xl font-semibold sm:text-3xl">Books I’ve read.</h1>
      </div>

      <div className="px-2 py-2 sm:px-4 sm:pt-3 sm:pb-2">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          What I’ve read, what I’m reading and what’s next, kept with the
          thoughts that stayed with me.
        </p>
        <p className="mt-1.5 font-mono text-sm text-muted-foreground">
          Inspired by{" "}
          <a
            href="https://grokipedia.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            grokipedia.com
            <ArrowIcon size={13} strokeWidth={1.5} />
          </a>
        </p>
      </div>

      <div className="screen-line-after px-2 py-1.5 sm:px-4 sm:py-2">
        <h2 className="text-base font-semibold sm:text-lg">On my shelves</h2>
      </div>

      <div className="p-2 sm:p-4 md:px-6 md:py-4">
        <BooksWall books={BOOKS} />
      </div>

      <div className="h-12" />
    </div>
  );
}
