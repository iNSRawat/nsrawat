"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { USER } from "@/features/portfolio/data/user";

import { PronounceMyName } from "./pronounce-my-name";
import { VerifiedIcon } from "./verified-icon";

function useTypewriter(sentences: string[], speed = 60, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!sentences.length) return;
    const current = sentences[sentenceIdx] ?? "";

    if (!deleting && charIdx < current.length) {
      const id = setTimeout(() => {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(id);
    }

    if (!deleting && charIdx === current.length) {
      const id = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(id);
    }

    if (deleting && charIdx > 0) {
      const id = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
      return () => clearTimeout(id);
    }

    if (deleting && charIdx === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeleting(false);
      setSentenceIdx((i) => (i + 1) % sentences.length);
    }
  }, [charIdx, deleting, sentenceIdx, sentences, speed, pause]);

  return { display, blink };
}

function LiveClock({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const time = now.toLocaleTimeString("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <span className="tabular-nums">
      {time}
      <span className="mx-1.5 opacity-40">·</span>
      {date}
    </span>
  );
}

export function ProfileHeader() {
  const { display, blink } = useTypewriter(USER.flipSentences);

  return (
    <div className="relative overflow-hidden border-x border-edge">
      {/* Content row */}
      <div className="flex items-center justify-between gap-4 px-5 pt-5 pb-2 sm:gap-8 sm:px-8 sm:pt-8 sm:pb-2">
        {/* Left: text */}
        <div className="flex min-w-0 flex-1 flex-col gap-2.5 sm:gap-3">
          {/* Availability badge */}
          <span className="inline-flex w-fit items-center gap-2 rounded-sm border border-edge px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            <span className="relative flex size-1.5 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for work
          </span>

          {/* Name */}
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-mono text-xl font-bold tracking-tight text-foreground [word-spacing:-0.25em] sm:text-3xl">
              {USER.displayName}
            </h1>
            <VerifiedIcon
              className="size-4.5 shrink-0 text-info sm:size-5"
              aria-label="Verified"
            />
            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          {/* Typewriter role */}
          <p className="font-mono text-xs text-muted-foreground sm:text-sm">
            <span className="opacity-60">~/</span>
            {display}
            <span
              className="ml-px inline-block h-[1em] w-[2px] align-middle bg-muted-foreground transition-opacity"
              style={{ opacity: blink ? 1 : 0 }}
            />
          </p>

          {/* Location + clock */}
          <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 font-mono text-[10px] text-muted-foreground sm:text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="size-3 shrink-0"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span>{USER.address}</span>
            <span className="mx-1 opacity-40">·</span>
            <LiveClock timeZone={USER.timeZone} />
          </div>
        </div>

        {/* Right: avatar */}
        <div className="group relative shrink-0">
          <div className="pointer-events-none absolute inset-[-4px] z-0 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 opacity-0 blur-md transition-opacity duration-300 group-hover:animate-spin group-hover:opacity-60 group-hover:[animation-duration:3s]" />
          <div className="pointer-events-none absolute inset-[-2px] z-0 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 opacity-0 transition-opacity duration-300 group-hover:animate-spin group-hover:opacity-100 group-hover:[animation-duration:3s]" />
          <Image
            className="relative z-10 size-16 select-none rounded-full ring-1 ring-border ring-offset-2 ring-offset-background sm:size-28"
            alt={`${USER.displayName}'s avatar`}
            src={USER.avatar}
            width={112}
            height={112}
            priority
          />
        </div>
      </div>
    </div>
  );
}
