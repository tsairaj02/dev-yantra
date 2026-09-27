import { describe, expect, it } from "vitest";
import { DEFAULT_GRID, generateGridCSS } from "./grid";

describe("generateGridCSS", () => {
  it("generates the default grid CSS block", () => {
    expect(generateGridCSS(DEFAULT_GRID)).toBe(
      [
        "display: grid;",
        "grid-template-columns: repeat(4, 60px);",
        "grid-template-rows: repeat(3, 60px);",
        "column-gap: 16px;",
        "row-gap: 16px;",
        "justify-items: stretch;",
        "align-items: stretch;",
        "justify-content: start;",
        "align-content: start;",
        "grid-auto-flow: row;",
      ].join("\n"),
    );
  });

  it("reflects a changed column and row count", () => {
    const css = generateGridCSS({ ...DEFAULT_GRID, columns: 6, rows: 2 });
    expect(css).toContain("grid-template-columns: repeat(6, 60px);");
    expect(css).toContain("grid-template-rows: repeat(2, 60px);");
  });

  it("reflects changed gaps independently", () => {
    const css = generateGridCSS({
      ...DEFAULT_GRID,
      columnGap: 4,
      rowGap: 40,
    });
    expect(css).toContain("column-gap: 4px;");
    expect(css).toContain("row-gap: 40px;");
  });

  it("reflects a changed grid-auto-flow", () => {
    const css = generateGridCSS({
      ...DEFAULT_GRID,
      gridAutoFlow: "column dense",
    });
    expect(css).toContain("grid-auto-flow: column dense;");
  });

  it("clamps columns above the maximum", () => {
    const css = generateGridCSS({ ...DEFAULT_GRID, columns: 999 });
    expect(css).toContain("repeat(12, 60px)");
  });

  it("clamps rows below the minimum", () => {
    const css = generateGridCSS({ ...DEFAULT_GRID, rows: 0 });
    expect(css).toContain("repeat(1, 60px)");
  });

  it("clamps gap values to their range", () => {
    const css = generateGridCSS({
      ...DEFAULT_GRID,
      columnGap: -10,
      rowGap: 500,
    });
    expect(css).toContain("column-gap: 0px;");
    expect(css).toContain("row-gap: 100px;");
  });
});
