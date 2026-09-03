export function clsx(
  ...args: Array<string | boolean | number | null | undefined | Record<string, boolean>>
): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (arg === false || arg === null || arg === undefined) continue;

    if (typeof arg === "string" || typeof arg === "number") {
      classes.push(String(arg));
    } else if (typeof arg === "object") {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}