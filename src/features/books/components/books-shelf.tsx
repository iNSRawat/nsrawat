"use client";

import "@/features/books/styles/books.css";

import Image from "next/image";
import * as React from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { Book, BookStatus } from "@/features/books/data/books";

interface BooksShelfProps {
  books: Book[];
}

const SHELVES = [
  { status: "reading" as BookStatus, label: "Started", pose: "spine" as const },
  { status: "read" as BookStatus, label: "Read", pose: "spine" as const },
  { status: "to-read" as BookStatus, label: "To read", pose: "face" as const },
];

const LEAN_ANGLES = [-3.5, 2, -1.5, 3, -2.5, 1.5];

const calcSpineWidth = (pages: number) =>
  Math.round(Math.min(34, Math.max(14, 10 + 0.026 * pages)));

const getAuthorLastName = (author: string) => {
  const parts = author
    .replace(/\s*\(.*\)$/, "")
    .replace(/,.*$/, "")
    .split(" ");
  return parts[parts.length - 1];
};

function FormattedNote({ text }: { text: string }) {
  const parts = text.split(/(<mark>.*?<\/mark>)/g);
  return (
    <>
      {parts.map((part, i) => {
        const isMark = part.startsWith("<mark>") && part.endsWith("</mark>");
        const content = isMark ? part.slice(6, -7) : part;
        return isMark ? (
          <mark key={i}>{content}</mark>
        ) : (
          <React.Fragment key={i}>{content}</React.Fragment>
        );
      })}
    </>
  );
}

function computeSpineTitle(book: Book, spineWidth: number) {
  const authorLast = getAuthorLastName(book.author);
  const availableHeight = 128 * book.ratio - 38 - 4.4 * authorLast.length;
  const singleLine = Math.min(
    12,
    0.6 * spineWidth,
    availableHeight / (0.6 * book.title.length),
  );
  if (singleLine >= 9 || spineWidth < 19) {
    return { size: Math.max(7.5, singleLine), lines: 1 };
  }
  const twoLine = Math.min(
    10,
    0.4 * spineWidth,
    availableHeight / ((book.title.length / 2 + 2) * 0.6),
  );
  return twoLine > singleLine
    ? { size: twoLine, lines: 2 }
    : { size: Math.max(7.5, singleLine), lines: 1 };
}

export function BooksWall({ books }: BooksShelfProps) {
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<Record<string, number>>({});
  const [scale, setScale] = useState<number | null>(null);

  const buttonMapRef = useRef(new Map<string, HTMLButtonElement>());
  const wallContainerRef = useRef<HTMLDivElement>(null);
  const thoughtsFollowRef = useRef<HTMLDivElement>(null);
  const lastActiveTitleRef = useRef<string | null>(null);

  // Group books by shelf and compute layout metrics
  const shelfData = useMemo(() => {
    return SHELVES.map((shelf) => {
      const shelfBooks = books.filter((b) => b.status === shelf.status);
      let metrics: { widths: number[]; width: number; height: number };

      if (shelfBooks.length === 0) {
        return {
          ...shelf,
          books: [],
          metrics: { widths: [], width: 0, height: 0 },
        };
      }

      if (shelf.pose === "face") {
        const widths = shelfBooks.map((_, i) =>
          i === shelfBooks.length - 1 ? 92 : 58.88,
        );
        const totalW =
          widths.reduce((sum, w) => sum + w, 0) +
          (shelfBooks.length - 1) * 3 +
          33.12 +
          16;
        const maxH = Math.max(...shelfBooks.map((b) => 92 * b.ratio));
        metrics = { widths, width: totalW, height: maxH };
      } else {
        const widths = shelfBooks.map((b) => calcSpineWidth(b.pages));
        const totalW =
          widths.reduce((sum, w) => sum + w, 0) +
          (shelfBooks.length - 1) * 3 +
          Math.max(...widths.map((w) => 128 - w)) +
          16;
        const maxH = Math.max(...shelfBooks.map((b) => 128 * b.ratio));
        metrics = { widths, width: totalW, height: maxH };
      }

      if (shelf.status === "reading") {
        metrics.width += 19;
      }

      return {
        ...shelf,
        books: shelfBooks,
        metrics,
      };
    }).filter((s) => s.books.length > 0);
  }, [books]);

  const maxWallWidth = useMemo(() => {
    if (shelfData.length === 0) return 360;
    return Math.max(...shelfData.map((s) => s.metrics.width)) + 28;
  }, [shelfData]);

  // Responsive scale observer
  useEffect(() => {
    const el = wallContainerRef.current;
    if (!el) return;

    const handleResize = () => {
      const clientWidth = el.clientWidth;
      setScale(
        clientWidth <= 640 ? Math.min(0.8, clientWidth / maxWallWidth) : 1,
      );
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [maxWallWidth]);

  // Find active shelf and active book
  const activeShelfIndex = shelfData.findIndex((s) =>
    s.books.some((b) => b.title === activeTitle),
  );
  const activeShelf = activeShelfIndex < 0 ? null : shelfData[activeShelfIndex];
  const activeBookIndex = activeShelf
    ? activeShelf.books.findIndex((b) => b.title === activeTitle)
    : -1;
  const activeBook = activeShelf ? activeShelf.books[activeBookIndex] : null;

  // Align thoughts card with the active book shelf
  useLayoutEffect(() => {
    const followEl = thoughtsFollowRef.current;
    const parentEl = followEl?.parentElement;
    const cardEl = followEl?.querySelector(
      ".books-thoughts-card",
    ) as HTMLElement | null;
    const activeSlot =
      activeTitle === null
        ? null
        : buttonMapRef.current.get(activeTitle)?.parentElement;
    const isMobile = (wallContainerRef.current?.clientWidth ?? 0) <= 640;

    if (!followEl || !parentEl) return;

    let offset = 0;
    if (cardEl && activeSlot && !isMobile) {
      const slotRect = activeSlot.getBoundingClientRect();
      const parentRect = parentEl.getBoundingClientRect();
      offset = Math.max(
        0,
        Math.min(
          slotRect.top - parentRect.top,
          parentEl.clientHeight - cardEl.offsetHeight,
        ),
      );
    }

    followEl.dataset.glide =
      lastActiveTitleRef.current !== null && activeTitle !== null
        ? "true"
        : "false";
    followEl.style.setProperty("--note-offset", `${Math.round(offset)}px`);
    lastActiveTitleRef.current = activeTitle;
  }, [activeTitle, scale]);

  const toggleBook = useCallback((title: string | null) => {
    setActiveTitle((prev) => (prev === title ? null : title));
  }, []);

  return (
    <div className="books-theme-wrapper">
      <div className="books-wall-container" ref={wallContainerRef}>
        <div
          className="books-wall"
          style={
            {
              ...(scale !== null
                ? ({ "--shelf-scale": scale } as React.CSSProperties)
                : {}),
              "--wall-width": `${Math.ceil(maxWallWidth)}px`,
              "--thoughts-row":
                activeShelfIndex < 0
                  ? 2 * SHELVES.length + 1
                  : 2 * activeShelfIndex + 2,
            } as React.CSSProperties
          }
        >
          {shelfData.map((shelf, shelfIdx) => (
            <section
              key={shelf.status}
              className="books-wall-shelf"
              data-shelf={shelf.status}
              data-pose={shelf.pose}
              aria-labelledby={`books-shelf-${shelf.status}`}
              style={
                {
                  "--shelf-row": 2 * shelfIdx + 1,
                  "--shelf-width": `${Math.ceil(shelf.metrics.width)}px`,
                  "--shelf-height": `${Math.ceil(shelf.metrics.height)}px`,
                } as React.CSSProperties
              }
            >
              <h3
                className="books-shelf-label"
                id={`books-shelf-${shelf.status}`}
              >
                {shelf.label} <span>{shelf.books.length}</span>
              </h3>

              <ol className="books-shelf">
                {shelf.pose === "spine" && shelf.status === "reading" ? (
                  <li className="books-shelf-bookend" aria-hidden="true" />
                ) : null}

                {shelf.books.map((book, bookIdx) => {
                  const isPulled = activeTitle === book.title;
                  const spineInfo =
                    shelf.pose === "spine"
                      ? computeSpineTitle(book, shelf.metrics.widths[bookIdx])
                      : null;
                  const isTabFocused =
                    (focusedIndex[shelf.status] ?? 0) === bookIdx;

                  return (
                    <li
                      key={book.title}
                      className="books-shelf-slot"
                      data-state={isPulled ? "pulled" : "shelved"}
                      style={
                        {
                          "--spine": `${shelf.pose === "spine" ? shelf.metrics.widths[bookIdx] : 92}px`,
                          "--shown": `${shelf.metrics.widths[bookIdx]}px`,
                          "--cover": `${shelf.pose === "spine" ? 128 : 92}px`,
                          "--book-height": `${Math.round((shelf.pose === "spine" ? 128 : 92) * book.ratio)}px`,
                          "--spine-color": book.spine.color,
                          "--spine-ink": book.spine.ink,
                          "--title-size": spineInfo
                            ? `${spineInfo.size.toFixed(2)}px`
                            : undefined,
                          "--lean": `${LEAN_ANGLES[bookIdx % LEAN_ANGLES.length]}deg`,
                          "--progress": book.progress ?? 0,
                        } as React.CSSProperties
                      }
                    >
                      <button
                        ref={(el) => {
                          if (el) {
                            buttonMapRef.current.set(book.title, el);
                          } else {
                            buttonMapRef.current.delete(book.title);
                          }
                        }}
                        type="button"
                        className="books-shelf-book"
                        tabIndex={isTabFocused ? 0 : -1}
                        aria-pressed={isPulled}
                        aria-label={`${book.title} by ${book.author}${book.rating ? `, rated ${book.rating}` : ""}${book.status === "reading" && book.progress ? `, ${book.progress}% read` : ""}`}
                        onClick={() => toggleBook(book.title)}
                        onFocus={() =>
                          setFocusedIndex((prev) => ({
                            ...prev,
                            [shelf.status]: bookIdx,
                          }))
                        }
                        onKeyDown={(e) => {
                          const delta = {
                            ArrowRight: 1,
                            ArrowLeft: -1,
                          }[e.key];
                          let nextIdx: number | null = null;
                          if (delta !== undefined) {
                            nextIdx =
                              (bookIdx + delta + shelf.books.length) %
                              shelf.books.length;
                          } else if (e.key === "Home") {
                            nextIdx = 0;
                          } else if (e.key === "End") {
                            nextIdx = shelf.books.length - 1;
                          } else if (
                            e.key === "Escape" &&
                            activeTitle !== null
                          ) {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveTitle(null);
                            return;
                          }
                          if (nextIdx !== null) {
                            e.preventDefault();
                            buttonMapRef.current
                              .get(shelf.books[nextIdx].title)
                              ?.focus();
                          }
                        }}
                      >
                        <span className="books-shelf-body" aria-hidden="true">
                          <span className="books-shelf-face books-shelf-face--cover">
                            <Image
                              src={book.cover}
                              alt=""
                              width={240}
                              height={Math.round(240 * book.ratio)}
                              sizes="128px"
                              draggable={false}
                              unoptimized
                            />
                          </span>

                          {shelf.pose === "spine" && (
                            <>
                              <span className="books-shelf-face books-shelf-face--pages" />
                              <span className="books-shelf-face books-shelf-face--spine">
                                <span
                                  className="books-shelf-spine-title"
                                  data-lines={spineInfo?.lines}
                                >
                                  {book.title}
                                </span>
                                <span className="books-shelf-spine-author">
                                  {getAuthorLastName(book.author)}
                                </span>
                                {book.rating === "Excellent" && (
                                  <span className="books-shelf-ribbon" />
                                )}
                                {book.rating === "Great" && (
                                  <span className="books-shelf-gilt" />
                                )}
                              </span>
                            </>
                          )}
                        </span>

                        {shelf.status === "reading" && (
                          <span
                            className="books-shelf-bookmark"
                            aria-hidden="true"
                          />
                        )}

                        <span
                          className="books-shelf-shadow"
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="books-shelf-ledge" aria-hidden="true" />
            </section>
          ))}

          {/* Floating / gliding thoughts card */}
          <div className="books-thoughts" aria-live="polite">
            <div className="books-thoughts-follow" ref={thoughtsFollowRef}>
              {activeBook && activeShelf ? (
                <div
                  className="books-thoughts-card"
                  data-status={activeBook.status}
                >
                  <p className="books-thoughts-count">
                    {activeShelf.label} ·{" "}
                    <strong>
                      {String(activeBookIndex + 1).padStart(2, "0")}
                    </strong>{" "}
                    / {String(activeShelf.books.length).padStart(2, "0")}
                  </p>

                  <h3 className="books-thoughts-title">{activeBook.title}</h3>

                  {activeBook.subtitle && activeBook.status !== "read" && (
                    <p className="books-thoughts-subtitle">
                      {activeBook.subtitle}
                    </p>
                  )}

                  <p className="books-thoughts-author">
                    by {activeBook.author}
                    {activeBook.rating && (
                      <span
                        className="books-thoughts-rating"
                        data-rating={activeBook.rating}
                      >
                        {activeBook.rating}
                      </span>
                    )}
                  </p>

                  {activeBook.status === "reading" &&
                    activeBook.progress !== undefined && (
                      <div className="books-thoughts-progress">
                        <span
                          className="books-thoughts-progress-track"
                          aria-hidden="true"
                        >
                          <span style={{ width: `${activeBook.progress}%` }} />
                        </span>
                        <span>{activeBook.progress}% in</span>
                      </div>
                    )}

                  <p className="books-thoughts-note">
                    <FormattedNote text={activeBook.note} />
                  </p>

                  <div className="books-thoughts-actions">
                    <button type="button" onClick={() => toggleBook(null)}>
                      Put back
                    </button>
                    {activeShelf.books.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          toggleBook(
                            activeShelf.books[
                              (activeBookIndex + 1) % activeShelf.books.length
                            ].title,
                          )
                        }
                      >
                        Next on this shelf <span aria-hidden="true">→</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
