import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FlexboxGenerator } from "./flexbox-generator";

beforeEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
    writable: true,
  });
});

const DEFAULT_CSS = [
  "display: flex;",
  "flex-direction: row;",
  "flex-wrap: nowrap;",
  "justify-content: flex-start;",
  "align-items: stretch;",
  "align-content: stretch;",
  "gap: 16px;",
].join("\n");

describe("FlexboxGenerator", () => {
  it("renders the default generated CSS", () => {
    render(<FlexboxGenerator />);
    expect(screen.getByTestId("generated-css").textContent).toBe(DEFAULT_CSS);
  });

  it("renders 5 preview items", () => {
    render(<FlexboxGenerator />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("updates flex-direction when changed", () => {
    render(<FlexboxGenerator />);
    fireEvent.change(screen.getByLabelText("flex-direction"), {
      target: { value: "column" },
    });
    expect(screen.getByTestId("generated-css").textContent).toContain(
      "flex-direction: column;",
    );
  });

  it("switches to row-gap/column-gap when unlinked", () => {
    render(<FlexboxGenerator />);
    fireEvent.click(screen.getByLabelText("Use a single gap value"));
    expect(screen.getByLabelText("Row Gap")).toBeInTheDocument();
    expect(screen.getByLabelText("Column Gap")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Row Gap"), {
      target: { value: "40" },
    });
    const css = screen.getByTestId("generated-css").textContent ?? "";
    const lines = css.split("\n");
    expect(lines).toContain("row-gap: 40px;");
    expect(lines).toContain("column-gap: 16px;");
    expect(lines).not.toContain("gap: 16px;");
  });

  it("resets to defaults after changes", () => {
    render(<FlexboxGenerator />);
    fireEvent.change(screen.getByLabelText("justify-content"), {
      target: { value: "center" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByTestId("generated-css").textContent).toBe(DEFAULT_CSS);
  });

  it("copies the generated CSS to the clipboard", async () => {
    vi.useFakeTimers();
    render(<FlexboxGenerator />);

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
