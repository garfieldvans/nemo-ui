import type { CSSProperties, ForwardedRef, ReactNode } from "react";

export type FileUploadRejectionReason = "type" | "size" | "count";

export interface FileUploadRejection {
  file: File;
  reason: FileUploadRejectionReason;
}

export interface FileUploadRef {
  focus: () => void;
  blur: () => void;
  /** Membuka dialog pemilih file, sama seperti klik pada area unggah. */
  open: () => void;
}

export interface FileUploadProps {
  label?: string;
  required?: boolean;
  error?: string;
  warning?: string;
  success?: string;
  helperText?: ReactNode;
  /** Atribut native `accept`, mis. `"image/*,.pdf"`. Juga dipakai untuk memfilter file hasil drag & drop. */
  accept?: string;
  /** Izinkan lebih dari satu file. Default `true`. */
  multiple?: boolean;
  /** Batas ukuran per file dalam byte. File yang lebih besar ditolak. */
  maxSize?: number;
  /** Batas jumlah file yang disimpan. */
  maxFiles?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  /** Judul di dalam area unggah. */
  dropText?: ReactNode;
  /** Keterangan kecil di bawah judul area unggah. */
  hint?: ReactNode;
  /** Daftar file terpilih (controlled). */
  value?: File[];
  /** Daftar file awal (uncontrolled). */
  defaultValue?: File[];
  /** Nama untuk input file native agar ikut terkirim bersama form. */
  name?: string;
  onChange?: (files: File[]) => void;
  onReject?: (rejected: FileUploadRejection[]) => void;
  id?: string;
  className?: string;
  style?: CSSProperties;
  ref?: ForwardedRef<FileUploadRef>;
}
