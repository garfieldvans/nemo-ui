import { useCallback, useId } from "react";
import styles from "./Modal.module.scss";

import type { ModalProps } from "./Modal.types";
import { clsx } from "../../utils/clsx";
import { CloseIcon } from "../internal/icons";
import { Portal } from "../internal/Portal";
import { useFocusTrap } from "../internal/useFocusTrap";
import { useScrollLock } from "../internal/useScrollLock";

export function Modal({
  open,
  onOpenChange,
  children,
  title,
  description,
  size = "md",
  footer,
  closeOnOverlay = true,
  closeOnEsc = true,
  className,
  style,
}: ModalProps) {
  const baseId = useId().replace(/:/g, "");
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;

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
          aria-describedby={description ? descId : undefined}
          data-size={size}
          tabIndex={-1}
          className={clsx(styles.panel, className)}
          style={style}
        >
          {title && (
            <header className={styles.header}>
              <div className={styles["header-text"]}>
                <h2 id={titleId} className={styles.title}>
                  {title}
                </h2>
                {description && (
                  <p id={descId} className={styles.description}>
                    {description}
                  </p>
                )}
              </div>
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

Modal.displayName = "Modal";