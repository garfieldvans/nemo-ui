import { clsx } from "./clsx";
import { composeRefs } from "./composeRefs";
import { isNil } from "./isNil";
import type { CSSProperties } from "react";

function isEventHandler(key: string): boolean {
  return key.length > 2 && key.startsWith("on") && key[2] === key[2].toUpperCase();
}

type MergedProps = Record<string, unknown>;

export function mergeProps<T1 extends Record<string, unknown>, T2 extends Record<string, unknown>>(
  defaults: T1,
  props: T2,
): T1 & T2 {
  const result: MergedProps = { ...defaults, ...props };

  // Ref
  if (!isNil(defaults.ref) || !isNil(props.ref)) {
    result.ref = composeRefs(defaults.ref as never, props.ref as never);
  }

  // Event handlers — call default first, then override
  for (const key of Object.keys({ ...defaults, ...props })) {
    if (isEventHandler(key)) {
      const defaultHandler = defaults[key] as ((e: unknown) => void) | undefined;
      const propHandler = props[key] as ((e: unknown) => void) | undefined;
      if (defaultHandler && propHandler) {
        result[key] = (e: unknown) => {
          defaultHandler(e);
          propHandler(e);
        };
      }
    }
  }

  // className
  if (defaults.className || props.className) {
    result.className = clsx(
      defaults.className as string | undefined,
      props.className as string | undefined,
    );
  }

  // class (non-React)
  if (defaults.class || props.class) {
    result.class = clsx(
      defaults.class as string | undefined,
      props.class as string | undefined,
    );
  }

  // style
  if (defaults.style || props.style) {
    result.style = { ...(defaults.style as CSSProperties), ...(props.style as CSSProperties) };
  }

  return result as T1 & T2;
}
