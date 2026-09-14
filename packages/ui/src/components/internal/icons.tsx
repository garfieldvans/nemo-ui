import type { SVGProps } from "react";

export type Tone = "success" | "info" | "warning" | "error";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

function IconBase({
  size = 20,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ToneIcon({ tone, size }: { tone: Tone; size?: number }) {
  switch (tone) {
    case "success":
      return (
        <IconBase size={size}>
          <circle cx="10" cy="10" r="8.5" />
          <path d="M6 10l2.8 2.8L14 7.5" />
        </IconBase>
      );
    case "warning":
      return (
        <IconBase size={size}>
          <path d="M10 3l8 14H2l8-14z" />
          <path d="M10 8v4" />
          <path d="M10 14.5h.01" />
        </IconBase>
      );
    case "error":
      return (
        <IconBase size={size}>
          <circle cx="10" cy="10" r="8.5" />
          <path d="M10 6v5" />
          <path d="M10 14.5h.01" />
        </IconBase>
      );
    default:
      return (
        <IconBase size={size}>
          <circle cx="10" cy="10" r="8.5" />
          <path d="M10 9.2v4.3" />
          <path d="M10 6.2h.01" />
        </IconBase>
      );
  }
}

export function CloseIcon({ size = 16 }: { size?: number }) {
  return (
    <IconBase size={size}>
      <path d="M5 5l10 10M15 5L5 15" />
    </IconBase>
  );
}