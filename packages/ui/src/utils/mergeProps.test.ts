import { mergeProps } from "./mergeProps";

describe("mergeProps", () => {
  it("spreads basic props, overrides with second arg", () => {
    const result = mergeProps(
      { id: "default", tabIndex: 0 },
      { id: "override" },
    );
    expect(result.id).toBe("override");
    expect(result.tabIndex).toBe(0);
  });

  it("merges event handlers — calls default first, then override", () => {
    const calls: string[] = [];
    const result = mergeProps(
      { onClick: () => calls.push("default") },
      { onClick: () => calls.push("override") },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result as any).onClick();
    expect(calls).toEqual(["default", "override"]);
  });

  it("merges className via clsx", () => {
    const result = mergeProps(
      { className: "btn" },
      { className: "primary" },
    );
    expect(result.className).toBe("btn primary");
  });

  it("merges style objects", () => {
    const result = mergeProps(
      { style: { color: "red", fontSize: 14 } },
      { style: { color: "blue" } },
    );
    expect(result.style).toEqual({ color: "blue", fontSize: 14 });
  });

  it("composes refs", () => {
    const ref1 = { current: null };
    const ref2 = { current: null };
    const result = mergeProps(
      { ref: ref1 },
      { ref: ref2 },
    );
    const node = document.createElement("div");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result as any).ref(node);
    expect(ref1.current).toBe(node);
    expect(ref2.current).toBe(node);
  });
});
