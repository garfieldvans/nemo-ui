import styles from "./Badge.module.scss";
import type { BadgeProps } from "./Badge.types";

export function Badge({
  children,
  color = "primary",
  variant = "filled",
  size = "md",
  className,
  style,
}: BadgeProps) {
  const classNames = [
    styles.badge,
    styles[`badge--${variant}`],
    styles[`badge--${color}`],
    styles[`badge--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classNames}
      style={style}
      role={variant === "dot" ? "status" : undefined}
      aria-label={variant === "dot" && typeof children === "string" ? children : undefined}
    >
      {children}
    </span>
  );
}