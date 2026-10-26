import { useEffect } from "react";

/** Kunci scroll body saat `active` (untuk overlay penuh seperti Modal/Drawer). */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}