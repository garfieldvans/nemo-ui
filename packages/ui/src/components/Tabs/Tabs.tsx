import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import styles from "./Tabs.module.scss";

import type { TabsItem, TabsProps } from "./Tabs.types";
import { clsx } from "../../utils/clsx";

function firstEnabled(items: TabsItem[]): number {
  return items.findIndex((item) => !item.disabled);
}

function lastEnabled(items: TabsItem[]): number {
  for (let i = items.length - 1; i >= 0; i -= 1) {
    if (!items[i].disabled) return i;
  }
  return -1;
}

function nextEnabled(items: TabsItem[], from: number, dir: 1 | -1): number {
  const count = items.length;
  if (count === 0) return -1;
  let idx = from;
  for (let step = 0; step < count; step += 1) {
    idx = (idx + dir + count) % count;
    if (!items[idx].disabled) return idx;
  }
  return from;
}

export function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  variant = "line",
  size = "md",
  ariaLabel,
  className,
  style,
}: TabsProps) {
  const isControlled = value !== undefined;
  const fallbackDefault =
    defaultValue ?? items.find((item) => !item.disabled)?.value;
  const [internalValue, setInternalValue] = useState(fallbackDefault);
  const currentValue = isControlled ? value : internalValue;

  const baseId = useId().replace(/:/g, "");
  const tabId = (v: string) => `${baseId}-tab-${v}`;
  const panelId = (v: string) => `${baseId}-panel-${v}`;

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // onChange selalu dipanggil (mode apa pun), konsisten dengan Select/RadioGroup.
  const select = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const activeIndex = items.findIndex((item) => item.value === currentValue);
  const activeItem = items[activeIndex];

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    // default: return — setiap jalur lanjut selalu mengisi target.
    let target: number;
    switch (e.key) {
      case "ArrowRight":
        target = nextEnabled(items, activeIndex, 1);
        break;
      case "ArrowLeft":
        target = nextEnabled(items, activeIndex, -1);
        break;
      case "Home":
        target = firstEnabled(items);
        break;
      case "End":
        target = lastEnabled(items);
        break;
      default:
        return;
    }
    e.preventDefault();
    if (target >= 0 && target !== activeIndex) {
      select(items[target].value);
      tabRefs.current[items[target].value]?.focus();
    }
  };

  return (
    <div className={clsx(styles.tabs, className)} style={style}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={clsx(
          styles.tablist,
          styles[`tablist--${variant}`],
        )}
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => {
          const active = item.value === currentValue;
          return (
            <button
              key={item.value}
              ref={(el) => {
                tabRefs.current[item.value] = el;
              }}
              id={tabId(item.value)}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={panelId(item.value)}
              aria-disabled={item.disabled || undefined}
              tabIndex={active ? 0 : -1}
              className={clsx(
                styles.tab,
                styles[`tab--${size}`],
                active && styles["tab--active"],
                item.disabled && styles["tab--disabled"],
              )}
              onClick={() => {
                if (item.disabled) return;
                select(item.value);
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem && (
        <div
          id={panelId(activeItem.value)}
          role="tabpanel"
          aria-labelledby={tabId(activeItem.value)}
          tabIndex={0}
          className={styles.panel}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}

Tabs.displayName = "Tabs";
