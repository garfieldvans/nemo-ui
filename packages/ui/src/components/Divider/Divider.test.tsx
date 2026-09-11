import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders an hr for horizontal orientation (default)", () => {
    render(<Divider />);
    const divider = screen.getByRole("separator");
    expect(divider.tagName).toBe("HR");
  });

  it("renders a div with aria-orientation for vertical orientation", () => {
    render(<Divider orientation="vertical" />);
    const divider = screen.getAllByRole("separator")[0];
    expect(divider.tagName).toBe("DIV");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
  });

  it("applies default color style for horizontal divider", () => {
    render(<Divider />);
    const divider = screen.getByRole("separator");
    expect(divider.style.background).toContain("--nemo-neutral-200");
    expect(divider.style.height).toBe("1px");
  });

  it("applies subtle color when color=subtle", () => {
    render(<Divider color="subtle" />);
    const divider = screen.getByRole("separator");
    expect(divider.style.background).toContain("--nemo-neutral-100");
  });

  it("applies vertical dimensions when vertical", () => {
    render(<Divider orientation="vertical" />);
    const divider = screen.getAllByRole("separator")[0];
    expect(divider.style.width).toBe("1px");
    expect(divider.style.height).toBe("100%");
  });
});