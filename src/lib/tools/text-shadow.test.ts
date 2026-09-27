import { describe, expect, it } from "vitest";
import { DEFAULT_TEXT_SHADOW, generateTextShadowCSS } from "./text-shadow";

describe("generateTextShadowCSS", () => {
  it("generates the default text-shadow value", () => {
    expect(generateTextShadowCSS(DEFAULT_TEXT_SHADOW)).toBe(
      "2px 2px 4px rgba(0, 0, 0, 0.5)",
    );
  });

  it("clamps opacity above 100", () => {
    const value = generateTextShadowCSS({
      ...DEFAULT_TEXT_SHADOW,
      opacity: 250,
    });
    expect(value).toContain("rgba(0, 0, 0, 1)");
  });

  it("clamps opacity below 0", () => {
    const value = generateTextShadowCSS({
      ...DEFAULT_TEXT_SHADOW,
      opacity: -10,
    });
    expect(value).toContain("rgba(0, 0, 0, 0)");
  });

  it("falls back to black for an invalid color", () => {
    const value = generateTextShadowCSS({
      ...DEFAULT_TEXT_SHADOW,
      color: "nope",
    });
    expect(value).toContain("rgba(0, 0, 0");
  });

  it("reflects a custom color", () => {
    const value = generateTextShadowCSS({
      ...DEFAULT_TEXT_SHADOW,
      color: "#ff0000",
    });
    expect(value).toContain("rgba(255, 0, 0");
  });
});
