import type { ReactNode } from "react";

export type ToastTone = "success" | "info" | "warning" | "error";

export type ToastPlacement =
  "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

export interface ToastOptions {
  title?: ReactNode;
  message?: ReactNode;
  tone?: ToastTone;
  action?: ReactNode;
  closable?: boolean;
  /** Durasi auto-close dalam ms. 0 = tidak auto-close. Default 4000. */
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
  tone: ToastTone;
  closable: boolean;
}

export interface ToastContextValue {
  show: (options: ToastOptions) => string;
  success: (title: ReactNode, options?: Omit<ToastOptions, "title">) => string;
  info: (title: ReactNode, options?: Omit<ToastOptions, "title">) => string;
  warning: (title: ReactNode, options?: Omit<ToastOptions, "title">) => string;
  error: (title: ReactNode, options?: Omit<ToastOptions, "title">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  toasts: ToastItem[];
}

export interface ToastProviderProps {
  children: ReactNode;
  placement?: ToastPlacement;
  /** Jumlah toast yang disimpan; yang paling lama di-drop saat melebihi batas. */
  maxToasts?: number;
  /**
   * Tampilkan satu toast sekaligus; sisanya menunggu dalam antrean dan muncul
   * setelah toast aktif ditutup (manual atau auto-dismiss). Default `false`:
   * semua toast ditumpuk sekaligus.
   */
  queue?: boolean;
}
