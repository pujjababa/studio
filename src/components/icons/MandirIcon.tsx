import type { SVGProps } from "react";

export function MandirIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 22h16" />
      <path d="M2 17h20" />
      <path d="M5 17v-5.571a1 1 0 0 1 .235-.638l4-5.143a1 1 0 0 1 1.53 0l4 5.143a1 1 0 0 1 .235.638V17" />
      <path d="M12 2v2" />
      <path d="m21.5 17-2-2.5-2 2.5" />
      <path d="m2.5 17 2-2.5 2 2.5" />
      <path d="M9 17v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />
    </svg>
  );
}
