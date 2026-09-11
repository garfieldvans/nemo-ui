import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeDefined();
  });

  it("applies default color and variant classes", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge.className).toContain("badge--filled");
    expect(badge.className).toContain("badge--primary");
    expect(badge.className).toContain("badge--md");
  });

  it("applies custom color and variant classes", () => {
    render(
      <Badge color="success" variant="outlined" size="sm">
        OK
      </Badge>
    );
    const badge = screen.getByText("OK");
    expect(badge.className).toContain("badge--outlined");
    expect(badge.className).toContain("badge--success");
    expect(badge.className).toContain("badge--sm");
  });

  it("renders dot variant as a status role without text", () => {
    render(<Badge variant="dot" color="error" />);
    const dot = screen.getByRole("status");
    expect(dot.className).toContain("badge--dot");
    expect(dot.textContent).toBe("");
  });

  it("merges a custom className", () => {
    render(<Badge className="custom-class">Tag</Badge>);
    expect(screen.getByText("Tag").className).toContain("custom-class");
  });
});