import { useCallback, useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

export interface UseFocusTrapOptions {
  active: boolean;
  onEscape?: () => void;
}

/**
 * Focus trap sederhana: saat `active`, fokus dibawa ke elemen `[data-autofocus]`
 * atau elemen focusable pertama dalam container, Tab disiklus dalam container,
 * Escape memicu `onEscape`, dan fokus dikembalikan ke elemen sebelumnya saat
 * trap dilepas/unmount.
 */
export function useFocusTrap({
  active,
  onEscape,
}: UseFocusTrapOptions): (el: HTMLElement | null) => void {
  const containerRef = useRef<HTMLElement | null>(null);

  // Simpan onEscape terbaru tanpa memicu ulang effect (identity call-site sering berubah)
  const onEscapeRef = useRef(onEscape);
  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  const containerRefCb = useCallback((el: HTMLElement | null) => {
    containerRef.current = el;
  }, []);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () => getFocusable(container);
    const items = focusables();
    const autoFocus = container.querySelector<HTMLElement>("[data-autofocus]");
    // Prioritas: [data-autofocus] → elemen focusable pertama → container itu sendiri.
    const target = autoFocus ?? items[0] ?? container;
    target?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscapeRef.current?.();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;
      const current = document.activeElement as HTMLElement | null;
      const index = current ? els.indexOf(current) : -1;
      let next: HTMLElement;
      if (e.shiftKey) {
        next = index <= 0 ? els[els.length - 1] : els[index - 1];
      } else {
        next = index === -1 || index === els.length - 1 ? els[0] : els[index + 1];
      }
      e.preventDefault();
      next.focus();
    };

    container.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [active]);

  return containerRefCb;
}