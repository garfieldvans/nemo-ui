import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { ScrollToTop } from "./ScrollToTop";

const setScrollY = (value: number) => {
  Object.defineProperty(window, "scrollY", { configurable: true, value });
};

const setReducedMotion = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockReturnValue({ matches }),
  });
};

let scrollTo: ReturnType<typeof vi.fn>;

beforeEach(() => {
  setScrollY(0);
  setReducedMotion(false);
  scrollTo = vi.fn();
  Object.defineProperty(window, "scrollTo", { configurable: true, value: scrollTo });
});

afterEach(() => {
  vi.restoreAllMocks();
});

const scrollToPosition = (value: number) => {
  setScrollY(value);
  fireEvent.scroll(window);
};

describe("ScrollToTop", () => {
  it("stays hidden until the page is scrolled past the threshold", () => {
    render(<ScrollToTop threshold={200} />);
    expect(screen.queryByRole("button")).toBeNull();

    scrollToPosition(199);
    expect(screen.queryByRole("button")).toBeNull();

    scrollToPosition(201);
    expect(screen.getByRole("button", { name: "Kembali ke atas" })).toBeDefined();
  });

  it("hides again when the page returns above the threshold", () => {
    render(<ScrollToTop threshold={100} />);
    scrollToPosition(150);
    expect(screen.getByRole("button")).toBeDefined();

    scrollToPosition(20);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("scrolls the window to the top smoothly by default", () => {
    render(<ScrollToTop threshold={100} />);
    scrollToPosition(500);

    fireEvent.click(screen.getByRole("button", { name: "Kembali ke atas" }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("uses instant scrolling when the user prefers reduced motion", () => {
    setReducedMotion(true);
    render(<ScrollToTop threshold={100} />);
    scrollToPosition(500);

    fireEvent.click(screen.getByRole("button"));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("honors smooth={false} and calls onClick", () => {
    const onClick = vi.fn();
    render(<ScrollToTop threshold={100} smooth={false} onClick={onClick} />);
    scrollToPosition(500);

    fireEvent.click(screen.getByRole("button"));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders a visible label instead of an aria-label", () => {
    render(<ScrollToTop threshold={100} showLabel label="Naik ke atas" />);
    scrollToPosition(300);

    const button = screen.getByRole("button", { name: "Naik ke atas" });
    expect(button.textContent).toContain("Naik ke atas");
    expect(button).not.toHaveAttribute("aria-label");
  });

  it("shows immediately when the page is already scrolled on mount", () => {
    setScrollY(900);
    render(<ScrollToTop threshold={400} />);
    expect(screen.getByRole("button", { name: "Kembali ke atas" })).toBeDefined();
  });
});
