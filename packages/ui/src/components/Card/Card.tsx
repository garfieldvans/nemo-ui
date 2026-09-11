import styles from "./Card.module.scss";
import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from "./Card.types";

export function Card({
  children,
  variant = "elevated",
  padding = "md",
  rounded = "md",
  className,
  style,
  as: Component = "div",
}: CardProps) {
  const classNames = [
    styles.card,
    styles[`card--${variant}`],
    styles[`card--padding-${padding}`],
    styles[`card--rounded-${rounded}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classNames} style={style}>
      {children}
    </Component>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
  style,
}: CardHeaderProps) {
  return (
    <div className={`${styles.header} ${className ?? ""}`.trim()} style={style}>
      <div>
        <h3 className={styles["header-title"]}>{title}</h3>
        {subtitle ? <p className={styles["header-subtitle"]}>{subtitle}</p> : null}
      </div>
      {action ? <div className={styles["header-action"]}>{action}</div> : null}
    </div>
  );
}

export function CardBody({ children, className, style }: CardBodyProps) {
  return (
    <div className={`${styles.body} ${className ?? ""}`.trim()} style={style}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, style }: CardFooterProps) {
  return (
    <div className={`${styles.footer} ${className ?? ""}`.trim()} style={style}>
      {children}
    </div>
  );
}