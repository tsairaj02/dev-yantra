import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToolBreadcrumb } from "./tool-breadcrumb";

describe("ToolBreadcrumb", () => {
  it("renders the breadcrumb trail and back link for a known tool", () => {
    render(<ToolBreadcrumb toolSlug="box-shadow-generator" />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Web & Design" })).toHaveAttribute(
      "href",
      "/categories/web-design",
    );
    expect(screen.getByRole("link", { name: "CSS" })).toHaveAttribute(
      "href",
      "/categories/web-design/css",
    );
    expect(
      screen.getByRole("link", { name: "← Back to CSS Tools" }),
    ).toHaveAttribute("href", "/categories/web-design/css");
  });

  it("renders nothing for an unknown tool", () => {
    const { container } = render(<ToolBreadcrumb toolSlug="does-not-exist" />);
    expect(container).toBeEmptyDOMElement();
  });
});
