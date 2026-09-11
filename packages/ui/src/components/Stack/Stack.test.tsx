import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stack } from "./Stack";
import { Divider } from "../Divider/Divider";

describe("Stack", () => {
  it("renders children stacked vertically by default", () => {
    render(
      <Stack>
        <div>item-a</div>
      </Stack>
    );
    const stack = screen.getByText("item-a").parentElement!;
    expect(stack.style.display).toBe("flex");
    expect(stack.style.flexDirection).toBe("column");
  });

  it("uses numeric spacing as a CSS var with fallback", () => {
    render(<Stack spacing={3}><span>content</span></Stack>);
    const stack = screen.getByText("content").parentElement!;
    expect(stack.style.gap).toBe("var(--nemo-spacing-3, 12px)");
  });

  it("passes through string spacing directly", () => {
    render(<Stack spacing="24px"><span>content</span></Stack>);
    const stack = screen.getByText("content").parentElement!;
    expect(stack.style.gap).toBe("24px");
  });

  it("applies row direction when direction=row", () => {
    render(
      <Stack direction="row">
        <span>content</span>
      </Stack>
    );
    const stack = screen.getByText("content").parentElement!;
    expect(stack.style.flexDirection).toBe("row");
  });

  it("maps justify between to space-between", () => {
    render(
      <Stack justify="between">
        <span>content</span>
      </Stack>
    );
    const stack = screen.getByText("content").parentElement!;
    expect(stack.style.justifyContent).toBe("space-between");
  });

  it("maps align center to center", () => {
    render(
      <Stack align="center">
        <span>content</span>
      </Stack>
    );
    const stack = screen.getByText("content").parentElement!;
    expect(stack.style.alignItems).toBe("center");
  });

  it("injects dividers between children", () => {
    render(
      <Stack divider={<Divider />}>
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </Stack>
    );
    expect(screen.getAllByRole("separator")).toHaveLength(2);
  });

  it("renders top-level element via the as prop", () => {
    render(
      <Stack as="ul">
        <span>content</span>
      </Stack>
    );
    const stack = screen.getByText("content").parentElement!;
    expect(stack.tagName).toBe("UL");
  });
});