import {
  useCallback,
  useLayoutEffect,
  useState,
  type CSSProperties,
} from "react";
import styles from "./Popover.module.scss";

import type { PopoverProps } from "./Popover.types";
import { clsx } from "../../utils/clsx";
import { Portal } from "../internal/Portal";
import { useFloating } from "../internal/useFloating";

export function Popover({
  trigger,
  children,
  open,
  onOpenChange,
  defaultOpen = false,
  placement = "bottom",
  offset = 8,
  ariaLabel,
  className,
  style,
}: PopoverProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? (open as boolean) : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (isControlled) {
        onOpenChange?.(next);
      } else {
        setInternalOpen(next);
      }
    },
    [isControlled, onOpenChange]
  );

  const floating = useFloating({ placement, offset });
  const { triggerRef: floatingTriggerRef, panelRef: floatingPanelRef } = floating;

  // Forward posisi ke floating + simpan node untuk cek klik-luar.
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
  const [panelEl, setPanelEl] = useState<HTMLElement | null>(null);
  const buttonRef = useCallback(
    (el: HTMLElement | null) => {
      setTriggerEl(el);
      floatingTriggerRef(el);
    },
    [floatingTriggerRef]
  );
  const panelRef = useCallback(
    (el: HTMLElement | null) => {
      setPanelEl(el);
      floatingPanelRef(el);
    },
    [floatingPanelRef]
  );

  // Fokus ke panel saat terbuka (non-modal: dialog ringan).
  useLayoutEffect(() => {
    if (isOpen) panelEl?.focus();
  }, [isOpen, panelEl]);

  // Tutup saat klik di luar (mousedown) atau Escape.
  useLayoutEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (triggerEl?.contains(target) || panelEl?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, setOpen, triggerEl, panelEl]);

  const panelStyle: CSSProperties = {
    top: floating.position?.top,
    left: floating.position?.left,
    ...style,
  };

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
        className={styles.trigger}
      >
        {trigger}
      </button>
      {isOpen && (
        <Portal>
          <div
            ref={panelRef}
            role="dialog"
            aria-label={ariaLabel}
            tabIndex={-1}
            data-placement={floating.placement}
            className={clsx(styles.panel, className)}
            style={panelStyle}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
}

Popover.displayName = "Popover";