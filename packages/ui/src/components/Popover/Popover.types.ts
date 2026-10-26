import type { CSSProperties, ReactNode } from "react";

export type PopoverPlacement = "top" | "right" | "bottom" | "left";

export interface PopoverProps {
  /** Elemen ya di-render dalam trigger button. */
  trigger: ReactNode;
  /** Konten panel popover. */
  children: ReactNode;
  /** Controlled (tanpa ini = internal state). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Open awal saat uncontrolled. Default false. */
  defaultOpen?: boolean;
  /** Posisi default relatif trigger. Default "bottom". */
  placement?: PopoverPlacement;
  /** Jarak panel dari trigger (px). Default 8. */
  offset?: number;
  /** Nama aksesibel panel (role=dialog butuh nama). */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}