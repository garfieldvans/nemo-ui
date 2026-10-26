import { useCallback, useId } from "react";
import styles from "./Drawer.module.scss";

import type { DrawerProps } from "./Drawer.types";
import { clsx } from "../../utils/clsx";
import { CloseIcon } from "../internal/icons";
import { Portal } from "../internal/Portal";
import { useFocusTrap } from "../internal/useFocusTrap";
import { useScrollLock } from "../internal/useScrollLock";

export function Drawer({
  open,
  onOpenChange,
  children,
  title,
  footer,
  placement = "right",
  size = "md",
  closeOnOverlay = true,
  closeOnEsc = true,
  className,
  style,
}: DrawerProps) {
  // Drawer bersifat controlled: `open` / `onOpenChange` dikontrol oleh parent.
  // `closeOnOverlay` dan `closeOnEsc` adalah perilaku penutup tambahan yang dipanggil
  // dari sisi komponen setelah state diubah oleh parent (memanggil onOpenChange(false)).
  //
  // Portal + focus trap + scroll lock diterapkan saat `open` aktif.
  // Escape ditangani oleh useFocusTrap melalui onEscape; saat closeOnEsc true,
  // Escape akan memicu onOpenChange(false) dari komponen.
  const baseId = useId().replace(/:/g, "");
  const titleId = `${baseId}-title`;

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const panelRef = useFocusTrap({
    active: open,
    onEscape: closeOnEsc ? close : undefined,
  });

  useScrollLock(open);

  if (!open) return null;

  return (
    <Portal>
      <div
        className={styles.overlay}
        data-nemo-overlay
        onMouseDown={(e) => {
          if (closeOnOverlay && e.target === e.currentTarget) close();
        }}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          data-placement={placement}
          data-size={size}
          tabIndex={-1}
          className={clsx(
            styles.panel,
            styles[`panel--${placement}`],
            styles[`panel--size-${size}`],
            className
          )}
          style={style}
        >
          {title && (
            <header className={styles.header}>
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
              <button
                type="button"
                className={styles.close}
                onClick={close}
                aria-label="Tutup"
              >
                <CloseIcon size={16} />
              </button>
            </header>
          )}
          <div className={styles.body}>{children}</div>
          {footer && <footer className={styles.footer}>{footer}</footer>}
        </div>
      </div>
    </Portal>
  );
}

Drawer.displayName = "Drawer";