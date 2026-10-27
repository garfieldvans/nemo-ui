import type { CSSProperties } from "react";

export type PaginationSize = "sm" | "md";

export interface PaginationProps {
  /** Halaman aktif (1-based) — controlled. */
  page?: number;
  /** Halaman aktif awal — uncontrolled. Default 1. */
  defaultPage?: number;
  /** Jumlah total halaman. */
  pageCount: number;
  /** Dipanggil saat halaman berubah (controlled maupun uncontrolled). */
  onChange?: (page: number) => void;
  /** Jumlah saudara kiri/kanan halaman aktif di jendela tengah. Default 1. */
  siblingCount?: number;
  size?: PaginationSize;
  /** Nama aksesibel navigasi (nav aria-label). Default "Navigasi halaman". */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}
