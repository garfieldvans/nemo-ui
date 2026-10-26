import {
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type FocusEvent as ReactFocusEvent,
  type ReactElement,
  type Ref,
} from "react";
import styles from "./Tooltip.module.scss";

import type { TooltipProps } from "./Tooltip.types";
import { clsx } from "../../utils/clsx";
import { composeRefs } from "../../utils/composeRefs";
import { Portal } from "../internal/Portal";
import { useFloating } from "../internal/useFloating";

const DEFAULT_OPEN_DELAY = 100;
const DEFAULT_CLOSE_DELAY = 50;

type MergedHandler = (e: ReactMouseEvent | ReactFocusEvent) => void;

// Jalankan handler original elemen trigger, lalu handler tooltip.
function mergeHandler(
  existing: unknown,
  next: (e: ReactMouseEvent | ReactFocusEvent) => void
): MergedHandler {
  if (typeof existing === "function") {
    return (e) => {
      (existing as MergedHandler)(e);
      next(e);
    };
  }
  return next;
}

export function Tooltip({
  content,
  children,
  placement = "top",
  openDelay = DEFAULT_OPEN_DELAY,
  closeDelay = DEFAULT_CLOSE_DELAY,
  offset = 6,
  disabled = false,
  id,
  className,
  style,
}: TooltipProps) {
  const generatedId = useId().replace(/:/g, "");
  const tooltipId = id ?? `${generatedId}-tooltip`;

  const [open, setOpen] = useState(false);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const floating = useFloating({ placement, offset, flip: false });

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  const handleEnter = () => {
    if (disabled) return;
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openDelay > 0) {
      openTimer.current = window.setTimeout(show, openDelay);
    } else {
      show();
    }
  };

  const handleLeave = () => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeDelay > 0) {
      closeTimer.current = window.setTimeout(hide, closeDelay);
    } else {
      hide();
    }
  };

  useEffect(
    () => () => {
      if (openTimer.current !== null) window.clearTimeout(openTimer.current);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    },
    []
  );

  const childProps = (children as ReactElement<Record<string, unknown>>).props ?? {};
  const childRef = (children as { ref?: Ref<HTMLElement> }).ref;

  /* eslint-disable react-hooks/refs -- rule salah-positif: closure yang membaca
  ref timer hanya dijalankan saat event (bukan render), tapi rule hanya mengenal
  event prop di JSX, bukan handler hasil mergeHandler() pada anak yang di-clone. */
  const trigger = cloneElement(children as ReactElement<Record<string, unknown>>, {
    "aria-describedby": disabled ? undefined : tooltipId,
    ref: composeRefs<HTMLElement>(childRef, floating.triggerRef),
    onMouseEnter: mergeHandler(childProps.onMouseEnter, handleEnter),
    onMouseLeave: mergeHandler(childProps.onMouseLeave, handleLeave),
    onFocus: mergeHandler(childProps.onFocus, handleEnter),
    onBlur: mergeHandler(childProps.onBlur, handleLeave),
  });
  /* eslint-enable react-hooks/refs */

  const { top: panelTop, left: panelLeft } = floating.position ?? {};
  const panelPlacement = floating.placement;

  return (
    <>
      {trigger}
      {open && !disabled && (
        <Portal>
          <div
            ref={floating.panelRef}
            id={tooltipId}
            role="tooltip"
            data-placement={panelPlacement}
            className={clsx(styles.tooltip, className)}
            style={{
              top: panelTop,
              left: panelLeft,
              ...style,
            }}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
}

Tooltip.displayName = "Tooltip";