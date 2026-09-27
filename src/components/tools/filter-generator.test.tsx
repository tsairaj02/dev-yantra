import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FilterGenerator } from "./filter-generator";

beforeEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
    writable: true,
  });
});

describe("FilterGenerator", () => {
  it("renders the default generated CSS", () => {
    render(<FilterGenerator />);
    expect(
      screen.getByText("filter: contrast(110%) saturate(130%);"),
    ).toBeInTheDocument();
  });

  it("adds a function to the chain when its slider moves", () => {
    render(<FilterGenerator />);
    const blurSlider = screen.getByLabelText("Blur");
    fireEvent.change(blurSlider, { target: { value: "8" } });
    expect(
      screen.getByText("filter: blur(8px) contrast(110%) saturate(130%);"),
    ).toBeInTheDocument();
  });

  it("removes a function from the chain when returned to its no-op value", () => {
    render(<FilterGenerator />);
    const contrastSlider = screen.getByLabelText("Contrast");
    fireEvent.change(contrastSlider, { target: { value: "100" } });
    expect(screen.getByText("filter: saturate(130%);")).toBeInTheDocument();
  });

  it("resets to defaults after a change", () => {
    render(<FilterGenerator />);
    const sepiaSlider = screen.getByLabelText("Sepia");
    fireEvent.change(sepiaSlider, { target: { value: "80" } });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(
      screen.getByText("filter: contrast(110%) saturate(130%);"),
    ).toBeInTheDocument();
  });

  it("copies the generated CSS to the clipboard", async () => {
    vi.useFakeTimers();
    render(<FilterGenerator />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "filter: contrast(110%) saturate(130%);",
    );
    expect(screen.getByText("Copied to clipboard.")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText("Copied to clipboard.")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
