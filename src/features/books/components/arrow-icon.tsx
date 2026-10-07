import type { SVGProps } from "react";

interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export function ArrowIcon({
  size = 14,
  strokeWidth = 1.5,
  className,
  ...props
}: ArrowIconProps) {
  return (
    <svg
      {...props}
      className={[
        "squash-stretch-link-arrow inline-block align-middle transition-transform duration-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g transform="rotate(-45 12 12)">
        <path className="squash-stretch-link-arrow__shaft" d="M5 12h14" />
        <path className="squash-stretch-link-arrow__head" d="m12 5 7 7-7 7" />
      </g>
    </svg>
  );
}
