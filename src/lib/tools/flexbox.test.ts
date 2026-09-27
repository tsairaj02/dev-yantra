import { describe, expect, it } from "vitest";
import { DEFAULT_FLEXBOX, generateFlexboxCSS } from "./flexbox";

describe("generateFlexboxCSS", () => {
  it("generates the default flexbox CSS block", () => {
    expect(generateFlexboxCSS(DEFAULT_FLEXBOX)).toBe(
      [
        "display: flex;",
        "flex-direction: row;",
        "flex-wrap: nowrap;",
        "justify-content: flex-start;",
        "align-items: stretch;",
        "align-content: stretch;",
        "gap: 16px;",
      ].join("\n"),
    );
  });

  it("reflects a changed flex-direction", () => {
    const css = generateFlexboxCSS({
      ...DEFAULT_FLEXBOX,
      flexDirection: "column",
    });
    expect(css).toContain("flex-direction: column;");
  });

  it("uses row-gap and column-gap instead of gap when unlinked", () => {
    const css = generateFlexboxCSS({
      ...DEFAULT_FLEXBOX,
      linkedGap: false,
      rowGap: 8,
      columnGap: 24,
    });
    expect(css).toContain("row-gap: 8px;");
    expect(css).toContain("column-gap: 24px;");
    expect(css).not.toContain("gap: 16px;");
  });

  it("clamps gap above the maximum", () => {
    const css = generateFlexboxCSS({ ...DEFAULT_FLEXBOX, gap: 500 });
    expect(css).toContain("gap: 100px;");
  });

  it("clamps gap below the minimum", () => {
    const css = generateFlexboxCSS({ ...DEFAULT_FLEXBOX, gap: -10 });
    expect(css).toContain("gap: 0px;");
  });
});
