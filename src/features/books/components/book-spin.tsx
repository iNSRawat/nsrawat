"use client";

import "@/features/books/styles/books.css";

import Image from "next/image";
import * as React from "react";

import type { Book } from "@/features/books/data/books";

interface BookSpinProps {
  book: Book;
  className?: string;
}

const calcSpineWidth = (pages: number) =>
  Math.round(Math.min(34, Math.max(14, 10 + 0.026 * pages)));

const degToRad = (deg: number) => (deg * Math.PI) / 180;

function calcShades(angleDeg: number) {
  const sin = Math.sin(degToRad(angleDeg));
  const cos = Math.cos(degToRad(angleDeg));
  const shade = (s: number, c: number) =>
    (1 - Math.max(0, -0.2 * s + 0.98 * c)) * 0.38;
  return {
    front: shade(sin, cos),
    spine: shade(-cos, sin),
    pages: shade(cos, -sin),
    back: shade(-sin, -cos),
  };
}

const calcShadowScale = (angleDeg: number, ratio: number, depth: number) =>
  ((Math.abs(Math.cos(degToRad(angleDeg))) +
    depth * Math.abs(Math.sin(degToRad(angleDeg)))) /
    ratio) *
  1.08;

export function BookSpin({ book, className }: BookSpinProps) {
  const depth = calcSpineWidth(book.pages) / 128;
  const shades = calcShades(30);
  const shadowScale = calcShadowScale(30, book.ratio, depth);

  return (
    <span
      className={["book-spin-stage", className].filter(Boolean).join(" ")}
      style={
        {
          "--book-ratio": book.ratio,
          "--book-depth": depth,
          "--shadow-scale": shadowScale.toFixed(3),
          "--shade-front": shades.front.toFixed(3),
          "--shade-pages": shades.pages.toFixed(3),
          "--shade-back": shades.back.toFixed(3),
          "--shade-spine": shades.spine.toFixed(3),
        } as React.CSSProperties
      }
    >
      <span className="book-spin-shadow" />
      <span className="book-spin-float">
        <span className="book-spin-pose">
          <span
            className="book-spin-face book-spin-face--front"
            style={{ "--face-color": book.spine.color } as React.CSSProperties}
          >
            <Image
              src={book.cover}
              alt={book.title}
              width={160}
              height={Math.round(160 * book.ratio)}
              draggable={false}
              loading="eager"
              unoptimized
            />
          </span>
          <span
            className="book-spin-face book-spin-face--spine"
            style={
              {
                "--face-color": book.spine.color,
                "--face-ink": book.spine.ink,
              } as React.CSSProperties
            }
          >
            <span className="book-spin-spine-title">{book.title}</span>
          </span>
          <span
            className="book-spin-face book-spin-face--back"
            style={{ "--face-color": book.spine.color } as React.CSSProperties}
          />
          <span className="book-spin-face book-spin-face--pages" />
          <span className="book-spin-face book-spin-face--top" />
        </span>
      </span>
    </span>
  );
}
