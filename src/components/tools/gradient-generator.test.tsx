import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GradientGenerator } from "./gradient-generator";

beforeEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
    writable: true,
  });
});

describe("GradientGenerator", () => {
  it("renders the default generated CSS", () => {
    render(<GradientGenerator />);
    expect(
      screen.getByText(
        "background: linear-gradient(90deg, #ff0000 0%, #0000ff 100%);",
      ),
    ).toBeInTheDocument();
  });

  it("switches to a radial gradient", async () => {
    const user = userEvent.setup();
    render(<GradientGenerator />);
    await user.click(screen.getByLabelText("Radial"));
    expect(
      screen.getByText(
        "background: radial-gradient(circle, #ff0000 0%, #0000ff 100%);",
      ),
    ).toBeInTheDocument();
  });

  it("updates the angle for linear gradients", () => {
    render(<GradientGenerator />);
    const angleSlider = screen.getByLabelText("Angle");
    fireEvent.change(angleSlider, { target: { value: "45" } });
    expect(
      screen.getByText(
        "background: linear-gradient(45deg, #ff0000 0%, #0000ff 100%);",
      ),
    ).toBeInTheDocument();
  });

  it("adds a color stop", async () => {
    const user = userEvent.setup();
    render(<GradientGenerator />);
    await user.click(screen.getByRole("button", { name: "Add color stop" }));
    expect(screen.getByLabelText("Stop 3 position")).toBeInTheDocument();
  });

  it("prevents removing stops below the minimum of two", () => {
    render(<GradientGenerator />);
    expect(
      screen.getByRole("button", { name: "Remove stop 1" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Remove stop 2" }),
    ).toBeDisabled();
  });

  it("removes a stop after adding a third", async () => {
    const user = userEvent.setup();
    render(<GradientGenerator />);
    await user.click(screen.getByRole("button", { name: "Add color stop" }));
    const removeThird = screen.getByRole("button", { name: "Remove stop 3" });
    expect(removeThird).not.toBeDisabled();
    await user.click(removeThird);
    expect(screen.queryByLabelText("Stop 3 position")).not.toBeInTheDocument();
  });

  it("resets to defaults after changes", async () => {
    const user = userEvent.setup();
    render(<GradientGenerator />);
    await user.click(screen.getByRole("button", { name: "Add color stop" }));
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(
      screen.getByText(
        "background: linear-gradient(90deg, #ff0000 0%, #0000ff 100%);",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Stop 3 position")).not.toBeInTheDocument();
  });

  it("copies the generated CSS to the clipboard", async () => {
    vi.useFakeTimers();
    render(<GradientGenerator />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "background: linear-gradient(90deg, #ff0000 0%, #0000ff 100%);",
    );
    expect(screen.getByText("Copied to clipboard.")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText("Copied to clipboard.")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
