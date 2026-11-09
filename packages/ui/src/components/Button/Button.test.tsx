import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Simpan</Button>);
    expect(screen.getByRole("button", { name: "Simpan" })).toBeDefined();
  });

  it("applies default color and variant classes", () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole("button", { name: "Default" });
    expect(btn.className).toContain("button--filled");
    expect(btn.className).toContain("button--primary");
    expect(btn.className).toContain("button--md");
  });

  it("applies secondary color class across variants", () => {
    const { rerender } = render(<Button color="secondary">S</Button>);
    expect(
      screen.getByRole("button", { name: "S" }).className,
    ).toContain("button--secondary");

    rerender(
      <Button color="secondary" variant="outlined">
        S
      </Button>,
    );
    const outlined = screen.getByRole("button", { name: "S" });
    expect(outlined.className).toContain("button--secondary");
    expect(outlined.className).toContain("button--outlined");

    rerender(
      <Button color="secondary" variant="text">
        S
      </Button>,
    );
    const text = screen.getByRole("button", { name: "S" });
    expect(text.className).toContain("button--secondary");
    expect(text.className).toContain("button--text");
  });

  it("does not apply secondary class to default color", () => {
    render(<Button color="primary">P</Button>);
    expect(
      screen.getByRole("button", { name: "P" }).className,
    ).not.toContain("button--secondary");
  });
});
