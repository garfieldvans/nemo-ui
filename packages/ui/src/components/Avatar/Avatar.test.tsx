import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar, AvatarGroup } from "./Avatar";

describe("Avatar", () => {
  it("renders an image when src is provided", () => {
    render(<Avatar src="https://example.com/img.png" alt="Budi" />);
    const img = screen.getByRole("img", { name: "Budi" });
    expect(img.tagName).toBe("IMG");
  });

  it("shows initials from name when no src", () => {
    render(<Avatar name="Budi Santoso" />);
    expect(screen.getByText("BS")).toBeDefined();
  });

  it("shows single initial for one-word name", () => {
    render(<Avatar name="Budi" />);
    expect(screen.getByText("B")).toBeDefined();
  });

  it("renders nothing content when neither name nor src", () => {
    render(<Avatar alt="empty" />);
    const avatar = screen.getByLabelText("empty");
    expect(avatar.textContent).toBe("");
  });

  it("falls back to initials when image fails to load", () => {
    render(<Avatar src="broken.png" name="Siti Aminah" alt="Siti" />);
    const img = screen.getByRole("img", { name: "Siti" });
    fireEvent.error(img);
    // after error the image should be replaced by initials
    expect(screen.queryByRole("img", { name: "Siti" })).toBeNull();
    expect(screen.getByText("SA")).toBeDefined();
  });

  it("applies shape and size classes", () => {
    render(<Avatar name="Nemo" shape="square" size="lg" />);
    const avatar = screen.getByText("N");
    expect(avatar.className).toContain("avatar--square");
    expect(avatar.className).toContain("avatar--lg");
  });
});

describe("AvatarGroup", () => {
  it("renders all avatars when no max", () => {
    render(
      <AvatarGroup>
        <Avatar name="A" />
        <Avatar name="B" />
        <Avatar name="C" />
      </AvatarGroup>
    );
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
    expect(screen.getByText("C")).toBeDefined();
  });

  it("limits visible avatars and shows overflow count", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="A" />
        <Avatar name="B" />
        <Avatar name="C" />
        <Avatar name="D" />
      </AvatarGroup>
    );
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
    expect(screen.queryByText("C")).toBeNull();
    expect(screen.getByText("+2")).toBeDefined();
  });
});