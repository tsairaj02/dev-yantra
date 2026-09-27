import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TextShadowGenerator } from "./text-shadow-generator";

beforeEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
    writable: true,
  });
});

describe("TextShadowGenerator", () => {
  it("renders the default generated CSS", () => {
    render(<TextShadowGenerator />);
    expect(
      screen.getByText("text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);"),
    ).toBeInTheDocument();
  });

  it("updates the CSS output when the blur slider changes", () => {
    render(<TextShadowGenerator />);
    const blurSlider = screen.getByLabelText("Blur");
    fireEvent.change(blurSlider, { target: { value: "10" } });
    expect(
      screen.getByText("text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);"),
    ).toBeInTheDocument();
  });

  it("resets to defaults after a change", () => {
    render(<TextShadowGenerator />);
    const blurSlider = screen.getByLabelText("Blur");
    fireEvent.change(blurSlider, { target: { value: "30" } });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(
      screen.getByText("text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);"),
    ).toBeInTheDocument();
  });

  it("copies the generated CSS to the clipboard", async () => {
    vi.useFakeTimers();
    render(<TextShadowGenerator />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);",
    );
    expect(screen.getByText("Copied to clipboard.")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText("Copied to clipboard.")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
