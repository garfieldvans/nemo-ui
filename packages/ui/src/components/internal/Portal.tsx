import { useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { toCssVarMap, useTheme } from "../../theme";

/**
 * Portal generik untuk semua overlay (Modal/Drawer/Tooltip/Popover/Menu).
 * Render ke document.body DI LUAR wrapper ThemeProvider → bawa CSS vars +
 * color-scheme + data-theme secara eksplisit supaya tampilannya ikut tema app.
 * Wrapper div polos (tanpa transform/position) — aman untuk anak position:fixed.
 */
export function Portal({ children }: { children: ReactNode }) {
  const { theme, mode } = useTheme();

  // Node portal dibuat sekali (lazy state), lalu ditempel/dilepas di effect —
  // bukan pakai ref/read langsung di render supaya lolos react-hooks checks.
  const [portalNode] = useState<HTMLDivElement | null>(() => {
    if (typeof document === "undefined") return null;
    const node = document.createElement("div");
    node.setAttribute("data-nemo-portal", "");
    return node;
  });

  // Lampirkan node saat commit (bukan useEffect yang berjalan setelah paint):
  // callback-ref pengukur posisi (useFloating) menunda hitung ke microtask, dan
  // menjamin node sudah ter-lampir ke document saat itu — kalau tidak,
  // getBoundingClientRect() pada subtree yang terputus balik 0×0.
  useLayoutEffect(() => {
    if (!portalNode) return;
    document.body.appendChild(portalNode);
    return () => {
      portalNode.remove();
    };
  }, [portalNode]);

  const cssVars = useMemo(() => toCssVarMap(theme), [theme]);

  if (!portalNode) return null;

  return createPortal(
    <div data-theme={mode} style={{ ...cssVars, colorScheme: mode }}>
      {children}
    </div>,
    portalNode
  );
}