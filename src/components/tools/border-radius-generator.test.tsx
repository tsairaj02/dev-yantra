import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BorderRadiusGenerator } from "./border-radius-generator";

beforeEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
    writable: true,
  });
});

describe("BorderRadiusGenerator", () => {
  it("renders the default generated CSS", () => {
    render(<BorderRadiusGenerator />);
    expect(screen.getByText("border-radius: 12px;")).toBeInTheDocument();
  });

  it("updates all corners together while linked", () => {
    render(<BorderRadiusGenerator />);
    const allCornersSlider = screen.getByLabelText("All corners");
    fireEvent.change(allCornersSlider, { target: { value: "40" } });
    expect(screen.getByText("border-radius: 40px;")).toBeInTheDocument();
  });

  it("allows independent corners after unlinking", async () => {
    const user = userEvent.setup();
    render(<BorderRadiusGenerator />);
    await user.click(screen.getByLabelText("Link corners"));
    const topLeftSlider = screen.getByLabelText("Top Left");
    fireEvent.change(topLeftSlider, { target: { value: "40" } });
    expect(
      screen.getByText("border-radius: 40px 12px 12px 12px;"),
    ).toBeInTheDocument();
  });

  it("resets to defaults after a change", async () => {
    const user = userEvent.setup();
    render(<BorderRadiusGenerator />);
    await user.click(screen.getByLabelText("Link corners"));
    const topLeftSlider = screen.getByLabelText("Top Left");
    fireEvent.change(topLeftSlider, { target: { value: "80" } });
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByText("border-radius: 12px;")).toBeInTheDocument();
  });

  it("copies the generated CSS to the clipboard", async () => {
    vi.useFakeTimers();
    render(<BorderRadiusGenerator />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "border-radius: 12px;",
    );
    expect(screen.getByText("Copied to clipboard.")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText("Copied to clipboard.")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
