import {
  Children,
  Fragment,
  cloneElement,
  useCallback,
  useId,
  useLayoutEffect,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./Menu.module.scss";

import type { MenuItemProps, MenuProps } from "./Menu.types";
import { clsx } from "../../utils/clsx";
import { Portal } from "../internal/Portal";
import { useFloating } from "../internal/useFloating";

function MenuItem({ label, icon, disabled, className, ...rest }: MenuItemProps) {
  return (
    <div
      className={clsx(styles.item, disabled && styles["item--disabled"], className)}
      {...rest}
    >
      {icon && <span className={styles["item-icon"]}>{icon}</span>}
      <span className={styles["item-label"]}>{label}</span>
    </div>
  );
}

MenuItem.displayName = "Menu.Item";

function MenuDivider() {
  return <div role="separator" className={styles.divider} />;
}

MenuDivider.displayName = "Menu.Divider";

/** TODO: list item non-interaktif akan diteruskan apa adanya (mis. label header). */
interface ItemMeta {
  onSelect?: () => void;
  disabled: boolean;
}

function nextActive(
  from: number,
  dir: 1 | -1,
  meta: ItemMeta[]
): number {
  const count = meta.length;
  if (count === 0) return -1;
  if (from < 0) return dir === 1 ? firstEnabled(meta) : lastEnabled(meta);
  let next = (from + dir + count) % count;
  let guard = 0;
  while (guard < count) {
    const m = meta[next];
    if (!m.disabled) return next;
    next = (next + dir + count) % count;
    guard += 1;
  }
  return from;
}

function firstEnabled(meta: ItemMeta[]): number {
  const i = meta.findIndex((m) => !m.disabled);
  return i;
}

function lastEnabled(meta: ItemMeta[]): number {
  for (let i = meta.length - 1; i >= 0; i -= 1) {
    if (!meta[i].disabled) return i;
  }
  return -1;
}

function isMenuItem(child: ReactNode): child is ReactElement<MenuItemProps> {
  return (
    typeof child === "object" && child !== null && "type" in child && (child as ReactElement).type === MenuItem
  );
}

// Children.map tidak membongkar fragment (`<></>`) → flat-kan manual supaya
// Menu.Item di dalam fragment tetap di-klon dengan role/id/handler.
function flattenChildren(children: ReactNode): ReactNode[] {
  const out: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (
      typeof child === "object" &&
      child !== null &&
      "type" in child &&
      (child as ReactElement).type === Fragment
    ) {
      const props = (child as ReactElement<{ children?: ReactNode }>).props;
      out.push(...flattenChildren(props?.children));
    } else {
      out.push(child);
    }
  });
  return out;
}

function MenuImpl({
  trigger,
  children,
  open,
  onOpenChange,
  defaultOpen = false,
  placement = "bottom",
  offset = 8,
  ariaLabel,
  className,
  style,
}: MenuProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? (open as boolean) : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (isControlled) {
        onOpenChange?.(next);
      } else {
        setInternalOpen(next);
      }
    },
    [isControlled, onOpenChange]
  );

  const menuId = useId().replace(/:/g, "");
  const [activeIndex, setActiveIndex] = useState(-1);

  const floating = useFloating({ placement, offset });
  const { triggerRef: floatingTriggerRef, panelRef: floatingPanelRef } = floating;
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
  const [panelEl, setPanelEl] = useState<HTMLElement | null>(null);
  const buttonRef = useCallback(
    (el: HTMLElement | null) => {
      setTriggerEl(el);
      floatingTriggerRef(el);
    },
    [floatingTriggerRef]
  );
  const panelRef = useCallback(
    (el: HTMLElement | null) => {
      setPanelEl(el);
      floatingPanelRef(el);
    },
    [floatingPanelRef]
  );

  const meta: ItemMeta[] = [];
  const rendered = flattenChildren(children).map((child) => {
    if (!isMenuItem(child)) return child;
    const idx = meta.length;
    const disabled = child.props.disabled === true;
    const active = activeIndex === idx && !disabled;
    meta.push({ onSelect: child.props.onSelect, disabled });
    return cloneElement(child, {
      id: `${menuId}-item-${idx}`,
      role: "menuitem",
      "aria-disabled": disabled ? true : undefined,
      className: clsx(child.props.className, active && styles["item--active"]),
      onMouseEnter: disabled ? undefined : () => setActiveIndex(idx),
      onMouseDown: (e: ReactMouseEvent) => {
        if (!disabled) e.preventDefault();
      },
      onClick: () => {
        if (disabled) return;
        child.props.onSelect?.();
        setOpen(false);
      },
    });
  });

  useLayoutEffect(() => {
    if (isOpen) panelEl?.focus();
  }, [isOpen, panelEl]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (triggerEl?.contains(target) || panelEl?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [isOpen, setOpen, triggerEl, panelEl]);

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => nextActive(i, 1, meta));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => nextActive(i, -1, meta));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(firstEnabled(meta));
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(lastEnabled(meta));
        break;
      case "Enter":
      case " ": {
        e.preventDefault();
        const item = meta[activeIndex];
        if (item && !item.disabled) {
          item.onSelect?.();
          setOpen(false);
        }
        break;
      }
      case "Escape":
        setOpen(false);
        triggerEl?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const activeDescendant =
    activeIndex >= 0 && activeIndex < meta.length ? `${menuId}-item-${activeIndex}` : undefined;

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => {
          setActiveIndex(-1);
          setOpen(!isOpen);
        }}
        className={styles.trigger}
      >
        {trigger}
      </button>
      {isOpen && (
        <Portal>
          <div
            ref={panelRef}
            role="menu"
            aria-label={ariaLabel}
            aria-activedescendant={activeDescendant}
            tabIndex={-1}
            data-placement={floating.placement}
            className={clsx(styles.panel, className)}
            style={{
              top: floating.position?.top,
              left: floating.position?.left,
              ...style,
            }}
            onKeyDown={handleKeyDown}
          >
            {rendered}
          </div>
        </Portal>
      )}
    </>
  );
}

export const Menu = Object.assign(MenuImpl, {
  displayName: "Menu",
  Item: MenuItem,
  Divider: MenuDivider,
});