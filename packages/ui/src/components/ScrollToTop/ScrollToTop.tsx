import { useEffect, useState } from "react";

import styles from "./ScrollToTop.module.scss";

import type { ScrollToTopProps } from "./ScrollToTop.types";
import { clsx } from "../../utils/clsx";

function ArrowUpIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function currentScrollTop(): number {
  if (typeof window === "undefined") return 0;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function ScrollToTop({
  threshold = 400,
  position = "bottom-right",
  size = "md",
  label = "Kembali ke atas",
  showLabel = false,
  smooth = true,
  icon,
  onClick,
  className,
  style,
}: ScrollToTopProps) {
  // Simpan jarak gulir, bukan boolean: perubahan `threshold` langsung
  // tercermin tanpa menunggu event scroll berikutnya.
  const [scrollTop, setScrollTop] = useState(currentScrollTop);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => setScrollTop(currentScrollTop());
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (scrollTop <= threshold) return null;

  const handleClick = () => {
    const behavior: ScrollBehavior = smooth && !prefersReducedMotion() ? "smooth" : "auto";
    window.scrollTo({ top: 0, behavior });
    onClick?.();
  };

  return (
    <button
      type="button"
      className={clsx(
        styles.root,
        styles[`root--${position}`],
        styles[`root--${size}`],
        showLabel && styles["root--with-label"],
        className,
      )}
      style={style}
      onClick={handleClick}
      aria-label={showLabel ? undefined : label}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon ?? <ArrowUpIcon />}
      </span>
      {showLabel && <span className={styles.label}>{label}</span>}
    </button>
  );
}

ScrollToTop.displayName = "ScrollToTop";
