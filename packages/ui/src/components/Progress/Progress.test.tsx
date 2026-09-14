import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Progress } from "./Progress";

describe("Progress", () => {
  describe("line", () => {
    it("renders role=progressbar", () => {
      render(<Progress value={50} />);
      expect(screen.getByRole("progressbar")).toBeDefined();
    });

    it("sets aria-valuenow to the current value", () => {
      render(<Progress value={30} />);
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        "30"
      );
    });

    it("sets aria-valuemax to the max prop", () => {
      render(<Progress value={3} max={5} />);
      const bar = screen.getByRole("progressbar");
      expect(bar).toHaveAttribute("aria-valuemax", "5");
      expect(bar).toHaveAttribute("aria-valuenow", "3");
    });

    it("omits aria-valuenow when indeterminate", () => {
      render(<Progress indeterminate />);
      expect(screen.getByRole("progressbar")).not.toHaveAttribute(
        "aria-valuenow"
      );
    });

    it("shows rounded percentage text when showValue is set", () => {
      render(<Progress value={67} showValue />);
      expect(screen.getByText("67%")).toBeDefined();
    });

    it("does not render the value text for indeterminate progress", () => {
      render(<Progress indeterminate showValue />);
      expect(screen.queryByText("0%")).toBeNull();
    });
  });

  describe("circle", () => {
    it("renders an SVG", () => {
      const { container } = render(
        <Progress variant="circle" value={60} />
      );
      expect(container.querySelector("svg")).toBeDefined();
    });

    it("renders accessible role in circle variant", () => {
      render(<Progress variant="circle" value={80} />);
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        "80"
      );
    });

    it("renders percentage text inside the circle when showValue", () => {
      render(<Progress variant="circle" value={45} showValue />);
      expect(screen.getByText("45%")).toBeDefined();
    });

    it("sets aria-label", () => {
      render(<Progress value={20} label="Proses upload" />);
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-label",
        "Proses upload"
      );
    });
  });
});