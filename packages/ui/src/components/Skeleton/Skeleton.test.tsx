import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders one block by default", () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelectorAll("span")).toHaveLength(1);
  });

  it("is aria-hidden when no label is provided", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("renders sr-only label when provided", () => {
    const { container } = render(<Skeleton label="Memuat data" />);
    expect(screen.getByText("Memuat data")).toBeDefined();
    // Dengan label, root tidak boleh aria-hidden.
    expect(container.firstElementChild).not.toHaveAttribute("aria-hidden");
  });

  it("renders multiple text lines when lines is set", () => {
    const { container } = render(<Skeleton lines={3} />);
    expect(container.querySelectorAll("span")).toHaveLength(3);
  });

  it("marks the last line shorter when multiple lines", () => {
    const { container } = render(<Skeleton lines={2} />);
    const bars = container.querySelectorAll("span");
    expect(bars[1]).toHaveAttribute("data-short", "true");
    expect(bars[0]).not.toHaveAttribute("data-short");
  });

  it("applies variant data attribute", () => {
    const { container } = render(<Skeleton variant="circle" />);
    expect(container.querySelector('span[data-variant="circle"]')).toBeDefined();
  });

  it("applies animation data attribute", () => {
    const { container } = render(<Skeleton animation="wave" />);
    expect(container.querySelector('span[data-animation="wave"]')).toBeDefined();
  });

  it("accepts custom width and height", () => {
    const { container } = render(<Skeleton width={80} height={24} variant="rect" />);
    const bar = container.querySelector("span");
    expect(bar).toHaveStyle({ width: "80px", height: "24px" });
  });

  it("merges className", () => {
    const { container } = render(<Skeleton className="custom" />);
    expect(container.firstElementChild).toHaveClass("custom");
  });
});