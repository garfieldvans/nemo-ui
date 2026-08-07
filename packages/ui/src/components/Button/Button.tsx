import styles from "./Button.module.scss";

import type { ButtonProps } from "./Button.types";

export function Button({
  variant = "filled",
  color = "primary",
  size = "md",

  className = "",
  children,

  ...props
}: ButtonProps) {

  const classes = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${color}`],
    styles[`button--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}