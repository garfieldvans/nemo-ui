import type { CSSProperties, ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps {
  /** Control visibilitas — controlled component. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Lebar panel (max-width): 400 / 480 / 640. Default "md". */
  size?: ModalSize;
  /** Slot aksi (bawah panel, rata kanan). */
  footer?: ReactNode;
  /** Tutup saat klik backdrop. Default true. */
  closeOnOverlay?: boolean;
  /** Tutup saat tekan Escape. Default true. */
  closeOnEsc?: boolean;
  className?: string;
  style?: CSSProperties;
}