import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { defaultTheme, darkTheme, toCssVarMap } from "./tokens";

function ThemeConsumer() {
  const { theme, mode } = useTheme();
  return (
    <div>
      <span data-testid="primary">{theme.colors.primary[500]}</span>
      <span data-testid="mode">{mode}</span>
    </div>
  );
}

function Toggler() {
  const { mode, setMode } = useTheme();
  return (
    <button type="button" onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
      toggle
    </button>
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

  it("emits dark token values as inline vars when mode is dark", () => {
    render(
      <ThemeProvider mode="dark">
        <ThemeConsumer />
      </ThemeProvider>
    );
    const wrapper = screen.getByTestId("mode").closest("div")!.parentElement;
    const darkVars = toCssVarMap(darkTheme);
    expect(wrapper!.getAttribute("style")).toContain(
      `--nemo-neutral-0: ${darkVars["--nemo-neutral-0"]}`
    );
  });

  it("toggles theme tokens and data-theme via setMode", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
        <Toggler />
      </ThemeProvider>
    );
    const wrapper = screen.getByTestId("mode").closest("div")!.parentElement;
    expect(wrapper).toHaveAttribute("data-theme", "light");

    fireEvent.click(screen.getByText("toggle"));
    expect(wrapper).toHaveAttribute("data-theme", "dark");
    expect(screen.getByTestId("primary").textContent).toBe(
      darkTheme.colors.primary[500]
    );
  });

  it("sets color-scheme: dark in dark mode", () => {
    render(
      <ThemeProvider mode="dark">
        <ThemeConsumer />
      </ThemeProvider>
    );
    const wrapper = screen.getByTestId("mode").closest("div")!.parentElement;
    expect(wrapper!.getAttribute("style")).toContain("color-scheme: dark");
  });

  it("sets color-scheme: light in light mode", () => {
    render(
      <ThemeProvider mode="light">
        <ThemeConsumer />
      </ThemeProvider>
    );
    const wrapper = screen.getByTestId("mode").closest("div")!.parentElement;
    expect(wrapper!.getAttribute("style")).toContain("color-scheme: light");
  });
});
