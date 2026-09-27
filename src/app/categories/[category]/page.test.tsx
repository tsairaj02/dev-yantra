import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryPage from "./page";

describe("CategoryPage", () => {
  it("renders the category name and its subcategories", async () => {
    const ui = await CategoryPage({
      params: Promise.resolve({ category: "web-design" }),
    });
    render(ui);
    expect(
      screen.getByRole("heading", { name: "Web & Design" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /CSS/i })).toHaveAttribute(
      "href",
      "/categories/web-design/css",
    );
  });
});
