import type { CSSProperties, ReactNode } from "react";

export type ScrollToTopPosition = "bottom-right" | "bottom-left" | "bottom-center";
export type ScrollToTopSize = "sm" | "md" | "lg";

export interface ScrollToTopProps {
  /** Jarak gulir minimum (px) sebelum tombol tampil. Default 400. */
  threshold?: number;
  /** Sudut tempat tombol menempel. Default "bottom-right". */
  position?: ScrollToTopPosition;
  /** Ukuran tombol. Default "md". */
  size?: ScrollToTopSize;
  /** Teks tombol sekaligus nama aksesibel. Default "Kembali ke atas". */
  label?: string;
  /** Tampilkan teks label di samping ikon. Default false (hanya ikon). */
  showLabel?: boolean;
  /** Gulir halus; otomatis dimatikan saat pengguna memilih reduced motion. Default true. */
  smooth?: boolean;
  /** Ikon kustom menggantikan panah bawaan. */
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}
