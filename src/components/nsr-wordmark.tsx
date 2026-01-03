// NSRawat Wordmark - Simple text-based logotype
// Using a simple, readable pixel-style text representation

export function NSRawatWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 280 40"
      {...props}
    >
      <text
        x="0"
        y="32"
        fill="currentColor"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="32"
        fontWeight="bold"
        letterSpacing="-1"
      >
        NSRawat
      </text>
    </svg>
  );
}

export function getWordmarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 280 40"><text x="0" y="32" fill="${color}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="32" font-weight="bold" letter-spacing="-1">NSRawat</text></svg>`;
}
