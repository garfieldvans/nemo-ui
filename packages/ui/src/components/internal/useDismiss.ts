import { useEffect, useRef } from "react";

export type DismissReason = "escape" | "outside";

export interface UseDismissOptions {
  /** Listener hanya aktif saat overlay terbuka. */
  active: boolean;
  onDismiss: (reason: DismissReason) => void;
  /**
   * Node yang dianggap bagian dari overlay (biasanya trigger + panel). Klik di
   * dalam node ini tidak dihitung sebagai klik luar.
   */
  elements?: ReadonlyArray<HTMLElement | null | undefined>;
  /** Tutup saat mousedown di luar `elements` (default `true`). */
  outsideClick?: boolean;
  /** Tutup saat Escape (default `true`). */
  escape?: boolean;
  /**
   * Setelah Escape, fokus dikembalikan ke elemen ini — tetapi hanya bila fokus
   * sebelumnya memang berada di dalam overlay, supaya fokus milik elemen lain
   * tidak dirampas.
   */
  restoreFocusTo?: HTMLElement | null;
}

/**
 * Perilaku dismiss untuk overlay non-modal (Popover, Menu, Tooltip, dsb):
 * klik luar dan/atau Escape, dengan pengembalian fokus opsional ke trigger.
 *
 * `onDismiss`, `elements`, dan `restoreFocusTo` disimpan di ref terbaru supaya
 * call-site tidak perlu membungkusnya dengan `useCallback`/`useMemo` dan
 * listener tidak dipasang ulang setiap render.
 */
export function useDismiss({
  active,
  onDismiss,
  elements = [],
  outsideClick = true,
  escape = true,
  restoreFocusTo,
}: UseDismissOptions): void {
  const latest = useRef({ onDismiss, elements, restoreFocusTo });

  useEffect(() => {
    latest.current = { onDismiss, elements, restoreFocusTo };
  }, [onDismiss, elements, restoreFocusTo]);

  useEffect(() => {
    if (!active) return;

    const isInside = (node: Node | null): boolean =>
      node !== null && latest.current.elements.some((el) => el?.contains(node) ?? false);

    const handlePointerDown = (event: MouseEvent) => {
      if (isInside(event.target as Node | null)) return;
      latest.current.onDismiss("outside");
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      const focusWasInside = isInside(document.activeElement);
      latest.current.onDismiss("escape");
      if (focusWasInside) latest.current.restoreFocusTo?.focus();
    };

    if (outsideClick) document.addEventListener("mousedown", handlePointerDown);
    if (escape) document.addEventListener("keydown", handleKeyDown);

    return () => {
      if (outsideClick) document.removeEventListener("mousedown", handlePointerDown);
      if (escape) document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, escape, outsideClick]);
}
