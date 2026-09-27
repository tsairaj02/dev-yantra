import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GridGenerator } from "./grid-generator";

beforeEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
    writable: true,
  });
});

const DEFAULT_CSS = [
  "display: grid;",
  "grid-template-columns: repeat(4, 60px);",
  "grid-template-rows: repeat(3, 60px);",
  "column-gap: 16px;",
  "row-gap: 16px;",
  "justify-items: stretch;",
  "align-items: stretch;",
  "justify-content: start;",
  "align-content: start;",
  "grid-auto-flow: row;",
].join("\n");

describe("GridGenerator", () => {
  it("renders the default generated CSS", () => {
    render(<GridGenerator />);
    expect(screen.getByTestId("generated-css").textContent).toBe(DEFAULT_CSS);
  });

  it("renders 8 preview items", () => {
    render(<GridGenerator />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("updates columns when changed", () => {
    render(<GridGenerator />);
    fireEvent.change(screen.getByLabelText("Columns"), {
      target: { value: "6" },
    });
    expect(screen.getByTestId("generated-css").textContent).toContain(
      "grid-template-columns: repeat(6, 60px);",
    );
  });

  it("updates row and column gap independently", () => {
    render(<GridGenerator />);
    fireEvent.change(screen.getByLabelText("Row Gap"), {
      target: { value: "40" },
    });
    const css = screen.getByTestId("generated-css").textContent ?? "";
    const lines = css.split("\n");
    expect(lines).toContain("row-gap: 40px;");
    expect(lines).toContain("column-gap: 16px;");
  });

  it("updates grid-auto-flow when changed", () => {
    render(<GridGenerator />);
    fireEvent.change(screen.getByLabelText("grid-auto-flow"), {
      target: { value: "column dense" },
    });
    expect(screen.getByTestId("generated-css").textContent).toContain(
      "grid-auto-flow: column dense;",
    );
  });

  it("resets to defaults after changes", () => {
    render(<GridGenerator />);
    fireEvent.change(screen.getByLabelText("Columns"), {
      target: { value: "10" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByTestId("generated-css").textContent).toBe(DEFAULT_CSS);
  });

  it("copies the generated CSS to the clipboard", async () => {
    vi.useFakeTimers();
    render(<GridGenerator />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(DEFAULT_CSS);
    expect(screen.getByText("Copied to clipboard.")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText("Copied to clipboard.")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
