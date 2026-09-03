import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Input } from "./Input";

describe("Input", () => {
  it("should render", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeDefined();
  });

  it("should render with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeDefined();
  });

  it("should render with placeholder", () => {
    render(<Input placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText("Enter text...")).toBeDefined();
  });

  it("should render with error message", () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText("Invalid email")).toBeDefined();
  });

  it("should render with helper text", () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText("Enter your email address")).toBeDefined();
  });

  it("should handle user input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here..." />);
    const input = screen.getByPlaceholderText("Type here...");
    await user.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("should be disabled", async () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });
});