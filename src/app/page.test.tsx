import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("renders the Dev Yantra heading", () => {
    render(<Home />);
    expect(
      screen.getByText("Developer tools that just work."),
    ).toBeInTheDocument();
  });

  it("renders a link to the Web & Design category", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /Web & Design/i });
    expect(link).toHaveAttribute("href", "/categories/web-design");
  });
});
