import { useCallback, useEffect, useRef, useState } from "react";

export type FloatingPlacement = "top" | "right" | "bottom" | "left";

export interface UseFloatingOptions {
  placement?: FloatingPlacement;
  /** Jarak panel dari trigger (px). Default 6. */
  offset?: number;
  /** Flip placement kalau melebihi viewport. Default true. */
  flip?: boolean;
}

export interface UseFloatingResult {
  /** Ref untuk trigger (button/element penjaga giung). */
  triggerRef: (el: HTMLElement | null) => void;
  /** Ref untuk panel yang diposisikan. */
  panelRef: (el: HTMLElement | null) => void;
  /** Posisi `position:fixed` (viewport). `null` sampai pertama kali terukur. */
  position: { top: number; left: number } | null;
  /** Placement efektif (sudah flip). */
  placement: FloatingPlacement;
  /** true begitu posisi pertama dihitung. */
  mounted: boolean;
}

/**
 * Hook positioning hand-rolled (nol dependensi): panel diletakkan dengan
 * `position:fixed` center-aligned terhadap trigger, `flip` bila melebar
 * melewati viewport, dan di-recalc ulang saat scroll (capture) / resize.
 *
 * Ukuran pertama dihitung dari callback ref panel saat mount (fase commit,
 * sebelum paint → tanpa flash), bukan lewat effect, supaya lolos
 * react-hooks/set-state-in-effect.
 */
export function useFloating({
  placement = "bottom",
  offset = 6,
  flip = true,
}: UseFloatingOptions = {}): UseFloatingResult {
  const triggerElRef = useRef<HTMLElement | null>(null);
  const panelElRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [effPlacement, setEffPlacement] = useState<FloatingPlacement>(placement);

  const compute = useCallback(
    (trigger: HTMLElement, panel: HTMLElement) => {
      const t = trigger.getBoundingClientRect();
      const p = panel.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let eff: FloatingPlacement = placement;
      if (flip) {
        const overflowsBottom = t.bottom + offset + p.height > vh;
        const overflowsTop = t.top - offset - p.height < 0;
        const overflowsRight = t.right + offset + p.width > vw;
        const overflowsLeft = t.left - offset - p.width < 0;
        if (placement === "bottom" && overflowsBottom) eff = "top";
        else if (placement === "top" && overflowsTop) eff = "bottom";
        else if (placement === "right" && overflowsRight) eff = "left";
        else if (placement === "left" && overflowsLeft) eff = "right";
      }

      let top = 0;
      let left = 0;
      switch (eff) {
        case "bottom":
          top = t.bottom + offset;
          left = t.left + t.width / 2 - p.width / 2;
          break;
        case "top":
          top = t.top - offset - p.height;
          left = t.left + t.width / 2 - p.width / 2;
          break;
        case "right":
          top = t.top + t.height / 2 - p.height / 2;
          left = t.right + offset;
          break;
        case "left":
          top = t.top + t.height / 2 - p.height / 2;
          left = t.left - offset - p.width;
          break;
      }

      // Jaga tetap di dalam viewport (begitu panel menyentuh tepi).
      left = Math.min(Math.max(0, left), Math.max(0, vw - p.width));
      top = Math.min(Math.max(0, top), Math.max(0, vh - p.height));

      setPosition({ top, left });
      setEffPlacement(eff);
    },
    [placement, offset, flip]
  );

  const triggerRef = useCallback((el: HTMLElement | null) => {
    triggerElRef.current = el;
  }, []);

  const panelRef = useCallback(
    (el: HTMLElement | null) => {
      panelElRef.current = el;
      const trigger = triggerElRef.current;
      if (!el || !trigger) return;
      // Jangan hitung sinkron di callback-ref: saat commit React, panel sudah
      // masuk DOM tapi portal node-nya (data-nemo-portal) belum tentu ter-lampir
      // ke document → getBoundingClientRect() pada subtree terputus balik 0×0
      // → posisi jadi ter-clamp ke tepi viewport. Tunda ke microtask: saat itu
      // useLayoutEffect Portal (satu commit yang sama) sudah selesai menempel.
      queueMicrotask(() => compute(trigger, el));
    },
    [compute]
  );

  useEffect(() => {
    const recalc = () => {
      const trigger = triggerElRef.current;
      const panel = panelElRef.current;
      if (trigger && panel) compute(trigger, panel);
    };
    document.addEventListener("scroll", recalc, true);
    window.addEventListener("resize", recalc);
    return () => {
      document.removeEventListener("scroll", recalc, true);
      window.removeEventListener("resize", recalc);
    };
  }, [compute]);

  return {
    triggerRef,
    panelRef,
    position,
    placement: effPlacement,
    mounted: position !== null,
  };
}