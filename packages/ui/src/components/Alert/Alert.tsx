import { forwardRef } from "react";
import styles from "./Alert.module.scss";

import type { AlertProps } from "./Alert.types";
import { clsx } from "../../utils/clsx";
import { CloseIcon, ToneIcon } from "../internal/icons";

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      tone,
      title,
      children,
      icon,
      variant = "surface",
      closable = false,
      onClose,
      action,
      role,
      className,
      style,
    },
    ref
  ) => {
    // error/warning = assertive (alert), success/info = polite (status)
    const resolvedRole = role ?? (tone === "error" || tone === "warning" ? "alert" : "status");

    return (
      <div
        ref={ref}
        role={resolvedRole}
        data-variant={variant}
        data-tone={tone}
        aria-live={resolvedRole === "status" ? "polite" : undefined}
        aria-atomic="true"
        className={clsx(
          styles.alert,
          styles[`alert--${variant}`],
          styles[`alert--${tone}`],
          className
        )}
        style={style}
      >
        <span className={styles["alert-icon"]} aria-hidden="true">
          {icon ?? <ToneIcon tone={tone} />}
        </span>
        <div className={styles["alert-content"]}>
          {title && <div className={styles["alert-title"]}>{title}</div>}
          <div className={styles["alert-description"]}>{children}</div>
        </div>
        {action && <div className={styles["alert-action"]}>{action}</div>}
        {closable && (
          <button
            type="button"
            className={styles["alert-close"]}
            onClick={onClose}
            aria-label="Tutup"
          >
            <CloseIcon size={16} />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";