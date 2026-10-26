import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("shows tooltip on hover and hides on leave", () => {
    render(
      <Tooltip
        content="Info tambahan"
        openDelay={0}
        closeDelay={0}
      >
        <button type="button">Hover</button>
      </Tooltip>
    );
    const trigger = screen.getByRole("button", { name: "Hover" });
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Info tambahan");
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("shows tooltip on focus and hides on blur", () => {
    render(
      <Tooltip
        content="Info fokus"
        openDelay={0}
        closeDelay={0}
      >
        <button type="button">Fokus</button>
      </Tooltip>
    );
    const trigger = screen.getByRole("button", { name: "Fokus" });
    fireEvent.focus(trigger);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Info fokus");
    fireEvent.blur(trigger);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("sets aria-describedby on the trigger pointing to the tooltip id", () => {
    render(
      <Tooltip content="Info" openDelay={0} closeDelay={0}>
        <button type="button">Hover</button>
      </Tooltip>
    );
    const trigger = screen.getByRole("button", { name: "Hover" });
    const describedBy = trigger.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole("tooltip").id).toBe(describedBy);
  });

  it("does not open when disabled", () => {
    render(
      <Tooltip content="Info" disabled openDelay={0} closeDelay={0}>
        <button type="button">Hover</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByRole("button", { name: "Hover" }));
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("keeps the trigger's own event handlers", () => {
    const onEnter = vi.fn();
    render(
      <Tooltip content="Info" openDelay={0} closeDelay={0}>
        <button type="button" onMouseEnter={onEnter}>
          Hover
        </button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByRole("button", { name: "Hover" }));
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("tooltip")).toBeDefined();
  });

  it("sets data-placement on the tooltip", () => {
    render(
      <Tooltip content="Info" placement="right" openDelay={0} closeDelay={0}>
        <button type="button">Hover</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByRole("button", { name: "Hover" }));
    expect(screen.getByRole("tooltip")).toHaveAttribute("data-placement", "right");
  });

  it("responds within the open/close delay using timers", () => {
    vi.useFakeTimers();
    try {
      render(
        <Tooltip content="Info" openDelay={100} closeDelay={50}>
          <button type="button">Hover</button>
        </Tooltip>
      );
      const trigger = screen.getByRole("button", { name: "Hover" });
      fireEvent.mouseEnter(trigger);
      expect(screen.queryByRole("tooltip")).toBeNull();
      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(screen.getByRole("tooltip")).toBeDefined();

      fireEvent.mouseLeave(trigger);
      expect(screen.getByRole("tooltip")).toBeDefined();
      act(() => {
        vi.advanceTimersByTime(50);
      });
      expect(screen.queryByRole("tooltip")).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });
});