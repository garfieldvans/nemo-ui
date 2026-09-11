import { useState } from "react";
import { Children, cloneElement, type ReactElement } from "react";
import styles from "./Avatar.module.scss";
import type { AvatarProps, AvatarGroupProps } from "./Avatar.types";

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({
  src,
  alt,
  name,
  size = "md",
  shape = "circle",
  color = "neutral",
  className,
  style,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(src) && !hasError;

  const classNames = [
    styles.avatar,
    styles[`avatar--${shape}`],
    styles[`avatar--${size}`],
    styles[`avatar--${color}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fallbackContent = name ? initials(name) : null;

  return (
    <span className={classNames} style={style} aria-label={alt || name}>
      {showImage ? (
        <img
          className={styles.image}
          src={src}
          alt={alt || name || ""}
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        fallbackContent
      )}
    </span>
  );
}

export function AvatarGroup({
  children,
  max,
  size = "md",
  className,
  style,
}: AvatarGroupProps) {
  const avatars = Children.toArray(children) as ReactElement<AvatarProps>[];
  const visible = max ? avatars.slice(0, max) : avatars;
  const extraCount = max && avatars.length > max ? avatars.length - max : 0;

  return (
    <span className={`${styles.group} ${className ?? ""}`.trim()} style={style}>
      {visible.map((avatar, index) =>
        cloneElement(avatar, { key: avatar.key ?? index, size })
      )}
      {extraCount > 0 ? (
        <span
          className={`${styles.avatar} ${styles[`avatar--${size}`]} ${styles.group_more}`}
          aria-label={`${extraCount} more`}
        >
          +{extraCount}
        </span>
      ) : null}
    </span>
  );
}