// NSR Pixel Mark Logo - Correct "NSR" lettering
// Each letter is designed on a 64-wide grid

export function NSRMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 192 64"
      {...props}
    >
      <path
        fill="currentColor"
        d={`
          M0 0h8v64H0z
          M8 8h8v16H8z
          M16 24h8v16H16z
          M24 40h8v16H24z
          M24 0h8v64H24z
          
          M40 0h24v8H40z
          M40 0h8v32H40z
          M48 28h16v8H48z
          M56 32h8v24H56z
          M40 56h24v8H40z
          
          M72 0h8v64H72z
          M80 0h16v8H80z
          M88 8h8v20H88z
          M80 28h16v8H80z
          M80 36h8v28H80z
          M88 56h8v8H88z
        `}
      />
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 192 64"><path fill="${color}" d="M0 0h8v64H0zM8 8h8v16H8zM16 24h8v16H16zM24 40h8v16H24zM24 0h8v64H24zM40 0h24v8H40zM40 0h8v32H40zM48 28h16v8H48zM56 32h8v24H56zM40 56h24v8H40zM72 0h8v64H72zM80 0h16v8H80zM88 8h8v20H88zM80 28h16v8H80zM80 36h8v28H80zM88 56h8v8H88z"/></svg>`;
}
