import {
  useCallback,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

// Router minimal tanpa dependency: memakai History API + popstate.
// Cukup untuk situs dokumentasi statis (Vite dev & preview sudah punya
// fallback index.html untuk path yang tidak dikenal).

function currentPath(): string {
  const path = window.location.pathname.replace(/\/+$/, "");
  return path === "" ? "/" : path;
}

export function useRoute(): string {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const update = () => setPath(currentPath());
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return path;
}

export function navigate(to: string): void {
  const [pathname, hash] = to.split("#");

  if (pathname && pathname !== currentPath()) {
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
    if (!hash) window.scrollTo({ top: 0, left: 0 });
  }

  if (hash) {
    // Tunggu render halaman baru sebelum menggulir ke anchor.
    window.requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  children: ReactNode;
}

/**
 * Link internal. Navigasi client-side, tetapi tetap memakai <a href> supaya
 * bisa di-open di tab baru / di-copy.
 */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      event.preventDefault();
      navigate(to);
    },
    [onClick, to],
  );

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
