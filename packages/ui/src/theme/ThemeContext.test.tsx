import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { defaultTheme, darkTheme } from "./tokens";

function ThemeConsumer() {
  const { theme, mode } = useTheme();
  return (
    <div>
      <span data-testid="primary">{theme.colors.primary[500]}</span>
      <span data-testid="mode">{mode}</span>
    </div>
  );
}

describe("ThemeProvider", () => {
  it("provides default theme when no props passed", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("primary").textContent).toBe(
      defaultTheme.colors.primary[500]
    );
    expect(screen.getByTestId("mode").textContent).toBe("light");
  });

  it("applies dark mode with data-theme attribute", () => {
    render(
      <ThemeProvider mode="dark">
        <ThemeConsumer />
      </ThemeProvider>
    );
    const wrapper = screen.getByTestId("mode").closest("div")!.parentElement;
    expect(wrapper).toHaveAttribute("data-theme", "dark");
    expect(screen.getByTestId("mode").textContent).toBe("dark");
    expect(screen.getByTestId("primary").textContent).toBe(
      darkTheme.colors.primary[500]
    );
  });

  it("merges custom theme overrides", () => {
    const customColor = "#FF0000";
    render(
      <ThemeProvider theme={{ colors: { primary: { 500: customColor } } }}>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("primary").textContent).toBe(customColor);
  });

  it("sets inline CSS vars on wrapper element", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    const wrapper = screen.getByTestId("mode").closest("div")!.parentElement;
    const style = wrapper!.getAttribute("style");
    expect(style).toContain("--nemo-primary-500");
  });
});
