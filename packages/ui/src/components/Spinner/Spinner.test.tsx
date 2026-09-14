import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders with status role", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeDefined();
  });

  it("has an accessible default label", () => {
    render(<Spinner />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("honors a custom label", () => {
    render(<Spinner label="Menyimpan data" />);
    expect(screen.getByText("Menyimpan data")).toBeDefined();
  });

  it("applies size data attribute", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveAttribute("data-size", "lg");
  });

  it("applies color data attribute", () => {
    render(<Spinner color="error" />);
    expect(screen.getByRole("status")).toHaveAttribute("data-color", "error");
  });

  it("merges className", () => {
    render(<Spinner className="custom" />);
    expect(screen.getByRole("status")).toHaveClass("custom");
  });
});