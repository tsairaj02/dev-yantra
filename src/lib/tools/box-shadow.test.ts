import { describe, expect, it } from "vitest";
import {
  DEFAULT_BOX_SHADOW,
  clamp,
  generateBoxShadowCSS,
  hexToRgb,
} from "./box-shadow";

describe("hexToRgb", () => {
  it("parses a 6-digit hex color", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("parses a 3-digit hex color", () => {
    expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("returns null for an invalid hex color", () => {
    expect(hexToRgb("not-a-color")).toBeNull();
  });
});

describe("clamp", () => {
  it("clamps values within range", () => {
    expect(clamp(50, 0, 100)).toBe(50);
    expect(clamp(-10, 0, 100)).toBe(0);
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it("falls back to min for NaN input", () => {
    expect(clamp(Number.NaN, 5, 100)).toBe(5);
  });
});

describe("generateBoxShadowCSS", () => {
  it("generates the default shadow value", () => {
    expect(generateBoxShadowCSS(DEFAULT_BOX_SHADOW)).toBe(
      "0px 4px 12px 0px rgba(0, 0, 0, 0.2)",
    );
  });

  it("prefixes inset when enabled", () => {
    const value = generateBoxShadowCSS({ ...DEFAULT_BOX_SHADOW, inset: true });
    expect(value.startsWith("inset ")).toBe(true);
  });

  it("clamps opacity above 100", () => {
    const value = generateBoxShadowCSS({
      ...DEFAULT_BOX_SHADOW,
      opacity: 250,
    });
    expect(value).toContain("rgba(0, 0, 0, 1)");
  });

  it("falls back to black for an invalid color", () => {
    const value = generateBoxShadowCSS({
      ...DEFAULT_BOX_SHADOW,
      color: "nope",
    });
    expect(value).toContain("rgba(0, 0, 0");
  });
});
