'use client';

import { clsx } from 'clsx';

const TiltedGridBackground = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx([
        'absolute overflow-hidden [mask-image:linear-gradient(white,transparent)]',
        className,
      ])}
    >
      <svg
        className={clsx([
          'h-[160%] w-full',
          'absolute inset-x-0 inset-y-[-30%] skew-y-[-18deg]',
          'dark:fill-white/[.01] dark:stroke-white/[.025]',
          'fill-black/[0.02] stroke-black/5',
        ])}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="tilted-grid-pattern"
            width="72"
            height="56"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="16"
          >
            <path d="M.5 56V.5H72" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#tilted-grid-pattern)" />
        <svg x="50%" y="16" overflow="visible">
          <rect strokeWidth="0" width="73" height="57" x="0" y="56" />
          <rect strokeWidth="0" width="73" height="57" x="72" y="168" />
        </svg>
      </svg>
    </div>
  );
};

export default TiltedGridBackground;
