import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SubcategoryPage from "./page";

describe("SubcategoryPage", () => {
  it("renders the subcategory name and its tools", async () => {
    const ui = await SubcategoryPage({
      params: Promise.resolve({ category: "web-design", subcategory: "css" }),
    });
    render(ui);
    expect(screen.getByRole("heading", { name: "CSS" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /CSS Box Shadow Generator/i }),
    ).toHaveAttribute("href", "/tools/box-shadow-generator");
    expect(
      screen.getByRole("link", { name: /CSS Border Radius Generator/i }),
    ).toHaveAttribute("href", "/tools/border-radius-generator");
    expect(
      screen.getByRole("link", { name: /CSS Gradient Generator/i }),
    ).toHaveAttribute("href", "/tools/gradient-generator");
  });
});
