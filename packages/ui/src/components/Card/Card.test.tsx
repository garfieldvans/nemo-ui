import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Hello Card</Card>);
    expect(screen.getByText("Hello Card")).toBeDefined();
  });

  it("applies default variant/padding/rounded classes", () => {
    render(<Card>Content</Card>);
    const card = screen.getByText("Content");
    expect(card.className).toContain("card--elevated");
    expect(card.className).toContain("card--padding-md");
    expect(card.className).toContain("card--rounded-md");
  });

  it("applies custom variant/padding/rounded classes", () => {
    render(
      <Card variant="outlined" padding="lg" rounded="none">
        Content
      </Card>
    );
    const card = screen.getByText("Content");
    expect(card.className).toContain("card--outlined");
    expect(card.className).toContain("card--padding-lg");
    expect(card.className).toContain("card--rounded-none");
  });

  it("renders via the as prop", () => {
    render(
      <Card as="section">
        <span>Content</span>
      </Card>
    );
    const card = screen.getByText("Content").parentElement!;
    expect(card.tagName).toBe("SECTION");
  });

  it("merges a custom className", () => {
    render(<Card className="custom">Content</Card>);
    expect(screen.getByText("Content").className).toContain("custom");
  });
});

describe("CardHeader", () => {
  it("renders title and subtitle", () => {
    render(<CardHeader title="Judul" subtitle="Deskripsi pendek" />);
    expect(screen.getByText("Judul")).toBeDefined();
    expect(screen.getByText("Deskripsi pendek")).toBeDefined();
  });

  it("renders action element", () => {
    render(<CardHeader title="Judul" action={<button>Action</button>} />);
    expect(screen.getByRole("button", { name: "Action" })).toBeDefined();
  });
});

describe("CardBody", () => {
  it("renders children", () => {
    render(<CardBody>Isi konten</CardBody>);
    expect(screen.getByText("Isi konten")).toBeDefined();
  });
});

describe("CardFooter", () => {
  it("renders children", () => {
    render(<CardFooter>Tombol aksi</CardFooter>);
    expect(screen.getByText("Tombol aksi")).toBeDefined();
  });
});