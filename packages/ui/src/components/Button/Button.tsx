import styles from "./Button.module.scss";

import type { ButtonProps } from "./Button.types";

export function Button({
  children,
  variant = "filled",
  color = "primary",
  size = "md",
  loading = false,
  startIcon,
  endIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[color],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          {startIcon}
          <span>{children}</span>
          {endIcon}
        </>
      )}
    </button>
  );
}