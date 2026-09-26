import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BoxShadowGenerator } from "./box-shadow-generator";

beforeEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
    writable: true,
  });
});

describe("BoxShadowGenerator", () => {
  it("renders the default generated CSS", () => {
    render(<BoxShadowGenerator />);
    expect(
      screen.getByText("box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);"),
    ).toBeInTheDocument();
  });

  it("updates the CSS output when the blur slider changes", () => {
    render(<BoxShadowGenerator />);
    const blurSlider = screen.getByLabelText("Blur");
    fireEvent.change(blurSlider, { target: { value: "30" } });
    expect(
      screen.getByText("box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.2);"),
    ).toBeInTheDocument();
  });

  it("resets to defaults after a change", async () => {
    const user = userEvent.setup();
    render(<BoxShadowGenerator />);
    const blurNumberInput = screen.getByLabelText("Blur (px) number input");
    await user.clear(blurNumberInput);
    await user.type(blurNumberInput, "50");
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(
      screen.getByText("box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);"),
    ).toBeInTheDocument();
  });

  it("copies the generated CSS to the clipboard", async () => {
    vi.useFakeTimers();
    render(<BoxShadowGenerator />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.2);",
    );
    expect(screen.getByText("Copied to clipboard.")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText("Copied to clipboard.")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
