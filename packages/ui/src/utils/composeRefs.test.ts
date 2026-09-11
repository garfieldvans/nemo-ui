import { createRef } from "react";
import { composeRefs } from "./composeRefs";

describe("composeRefs", () => {
  it("sets a callback ref", () => {
    const refFn = vi.fn();
    composeRefs(refFn)(document.createElement("div"));
    expect(refFn).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    refFn.mockClear();
  });

  it("sets an object ref", () => {
    const objRef = createRef<HTMLDivElement>();
    composeRefs(objRef)(document.createElement("div"));
    expect(objRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it("clears refs with null on cleanup", () => {
    const objRef = createRef<HTMLDivElement>();
    composeRefs(objRef)(null);
    expect(objRef.current).toBeNull();
  });

  it("calls multiple refs with the same node", () => {
    const refFn1 = vi.fn();
    const refFn2 = vi.fn();
    const node = document.createElement("div");
    composeRefs(refFn1, refFn2)(node);
    expect(refFn1).toHaveBeenCalledWith(node);
    expect(refFn2).toHaveBeenCalledWith(node);
  });

  it("skips undefined and null refs", () => {
    const refFn = vi.fn();
    const node = document.createElement("div");
    composeRefs(undefined, refFn, null)(node);
    expect(refFn).toHaveBeenCalledWith(node);
  });
});
