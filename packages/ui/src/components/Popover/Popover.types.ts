import type { CSSProperties, ReactNode } from "react";

export type PopoverPlacement = "top" | "right" | "bottom" | "left";

export interface PopoverProps {
  /** Elemen yang dirender sebagai trigger (string = tombol internal). */
  trigger: ReactNode;
  /**
   * Jadikan `trigger` sendiri sebagai elemen trigger: ref, aria, dan handler
   * klik diteruskan langsung tanpa wrapper. `trigger` harus satu elemen React.
   * Default false.
   */
  asChild?: boolean;
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