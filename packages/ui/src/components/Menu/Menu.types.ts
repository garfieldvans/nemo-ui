import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type MenuPlacement = "top" | "right" | "bottom" | "left";

export interface MenuProps {
  /** Elemen ya dirender dalam trigger button. */
  trigger: ReactNode;
  /** Isi list: `Menu.Item` / `Menu.Divider` / elemen lain. */
  children: ReactNode;
  /** Controlled (tanpa ini = internal state). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Open awal saat uncontrolled. Default false. */
  defaultOpen?: boolean;
  /** Posisi default relatif trigger. Default "bottom". */
  placement?: MenuPlacement;
  /** Jarak list dari trigger (px). Default 8. */
  offset?: number;
  /** Nama aksesibel list (role=menu butuh nama). */
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  /** Dipanggil saat item dipilih (click / Enter / Space). */
  onSelect?: () => void;
}