import type { Ref, RefCallback, MutableRefObject } from "react";

function setRef<T>(ref: Ref<T> | undefined, node: T | null): void {
  if (typeof ref === "function") {
    ref(node);
  } else if (ref && typeof ref === "object") {
    (ref as MutableRefObject<T | null>).current = node;
  }
}

export function composeRefs<T>(
  ...refs: Array<Ref<T> | undefined | null>
): RefCallback<T> {
  return (node: T | null) => {
    refs.forEach((ref) => setRef(ref, node));
  };
}
