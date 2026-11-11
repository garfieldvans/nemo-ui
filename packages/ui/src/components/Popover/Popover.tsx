import {
  cloneElement,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type Ref,
} from "react";
import styles from "./Popover.module.scss";

import type { PopoverProps } from "./Popover.types";
import { clsx } from "../../utils/clsx";
import { composeRefs } from "../../utils/composeRefs";
import { Portal } from "../internal/Portal";
import { useFloating } from "../internal/useFloating";

export function Popover({
  trigger,
  asChild = false,
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

  // Popover bersifat controlled/uncontrolled: saat `open` diberikan, state
  // dikontrol oleh parent; bila tidak, komponen mengelola statusnya sendiri
  // melalui `defaultOpen` + internal state.
  //
  // Popover adalah non-modal:
  // - menutup saat Escape
  // - menutup saat pointer mousedown di luar trigger dan panel
  // - fokus dipindah ke panel saat terbuka (bukan focus trap)
  //
  // Karena sifatnya ringan, popover tidak menangani klik-luar dan Escape
  // dengan focus recovery yang sama seperti modal; Escape langsung menutup,
  // dan tidak ada jebakan fokus di dalam panel.
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

  const toggleOpen = () => setOpen(!isOpen);

  // asChild: trigger itu sendiri yang menjadi elemen trigger (tanpa wrapper),
  // dengan ref/handler digabung ke milik child.
  const childTrigger =
    asChild && isValidElement(trigger)
      ? (trigger as ReactElement<Record<string, unknown>>)
      : null;
  const childOnClick = childTrigger?.props.onClick as
    | ((event: ReactMouseEvent<HTMLElement>) => void)
    | undefined;
  const childRef = childTrigger?.props.ref as Ref<HTMLElement> | undefined;
  const childTriggerRef = useMemo(
    () => composeRefs(childRef, buttonRef),
    [childRef, buttonRef]
  );

  // Trigger yang sudah berupa elemen (mis. <Button>) dirender apa adanya agar
  // tidak menjadi <button> di dalam <button>. Host span hanya untuk posisi.
  const triggerNode = childTrigger ? (
    cloneElement(childTrigger, {
      ref: childTriggerRef,
      "aria-haspopup": "dialog",
      "aria-expanded": isOpen,
      onClick: (event: ReactMouseEvent<HTMLElement>) => {
        childOnClick?.(event);
        if (!event.defaultPrevented) toggleOpen();
      },
    })
  ) : isValidElement(trigger) ? (
    <span ref={buttonRef} className={styles["trigger-host"]} onClick={toggleOpen}>
      {cloneElement(trigger as ReactElement<Record<string, unknown>>, {
        "aria-haspopup": "dialog",
        "aria-expanded": isOpen,
      })}
    </span>
  ) : (
    <button
      type="button"
      ref={buttonRef}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      onClick={toggleOpen}
      className={styles.trigger}
    >
      {trigger}
    </button>
  );

  return (
    <>
      {triggerNode}
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