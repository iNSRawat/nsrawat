// NSR Pixel Mark Logo - Correct "NSR" lettering
// Designed on a 32-unit grid

export function NSRMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 448 160"
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 0h32v32h-32zM96 0h32v32h-32zM0 32h32v32h-32zM32 32h32v32h-32zM96 32h32v32h-32zM0 64h32v32h-32zM64 64h32v32h-32zM96 64h32v32h-32zM0 96h32v32h-32zM96 96h32v32h-32zM0 128h32v32h-32zM96 128h32v32h-32zM192 0h32v32h-32zM224 0h32v32h-32zM256 0h32v32h-32zM160 32h32v32h-32zM192 64h32v32h-32zM224 64h32v32h-32zM256 96h32v32h-32zM160 128h32v32h-32zM192 128h32v32h-32zM224 128h32v32h-32zM320 0h32v32h-32zM352 0h32v32h-32zM384 0h32v32h-32zM320 32h32v32h-32zM416 32h32v32h-32zM320 64h32v32h-32zM352 64h32v32h-32zM384 64h32v32h-32zM320 96h32v32h-32zM384 96h32v32h-32zM320 128h32v32h-32zM416 128h32v32h-32z"
      />
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 448 160"><path fill="${color}" d="M0 0h32v32h-32zM96 0h32v32h-32zM0 32h32v32h-32zM32 32h32v32h-32zM96 32h32v32h-32zM0 64h32v32h-32zM64 64h32v32h-32zM96 64h32v32h-32zM0 96h32v32h-32zM96 96h32v32h-32zM0 128h32v32h-32zM96 128h32v32h-32zM192 0h32v32h-32zM224 0h32v32h-32zM256 0h32v32h-32zM160 32h32v32h-32zM192 64h32v32h-32zM224 64h32v32h-32zM256 96h32v32h-32zM160 128h32v32h-32zM192 128h32v32h-32zM224 128h32v32h-32zM320 0h32v32h-32zM352 0h32v32h-32zM384 0h32v32h-32zM320 32h32v32h-32zM416 32h32v32h-32zM320 64h32v32h-32zM352 64h32v32h-32zM384 64h32v32h-32zM320 96h32v32h-32zM384 96h32v32h-32zM320 128h32v32h-32zM416 128h32v32h-32z"/></svg>`;
}
