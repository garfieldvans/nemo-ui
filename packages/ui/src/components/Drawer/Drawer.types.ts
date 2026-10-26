import type { CSSProperties, ReactNode } from "react";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg";

export interface DrawerProps {
  /** Control visibilitas — controlled component. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: ReactNode;
  /** Slot aksi (bawah panel, rata kanan). */
  footer?: ReactNode;
  /** Sisi panel muncul. Default "right". */
  placement?: DrawerPlacement;
  /** Ukuran: lebar (kiri/kanan) 320/400/480 atau tinggi (atas/bawah) 240/320/400. */
  size?: DrawerSize;
  /** Tutup saat klik backdrop. Default true. */
  closeOnOverlay?: boolean;
  /** Tutup saat tekan Escape. Default true. */
  closeOnEsc?: boolean;
  className?: string;
  style?: CSSProperties;
}