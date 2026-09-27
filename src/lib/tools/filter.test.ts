import { describe, expect, it } from "vitest";
import { DEFAULT_FILTER, generateFilterCSS } from "./filter";

describe("generateFilterCSS", () => {
  it("generates the default filter combination", () => {
    expect(generateFilterCSS(DEFAULT_FILTER)).toBe(
      "contrast(110%) saturate(130%)",
    );
  });

  it("returns 'none' when every value is a no-op", () => {
    const value = generateFilterCSS({
      blur: 0,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      saturate: 100,
      sepia: 0,
    });
    expect(value).toBe("none");
  });

  it("includes blur only when non-zero", () => {
    const value = generateFilterCSS({
      blur: 5,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      saturate: 100,
      sepia: 0,
    });
    expect(value).toBe("blur(5px)");
  });

  it("chains multiple active functions in a fixed order", () => {
    const value = generateFilterCSS({
      blur: 2,
      brightness: 120,
      contrast: 100,
      grayscale: 0,
      hueRotate: 90,
      invert: 0,
      saturate: 100,
      sepia: 40,
    });
    expect(value).toBe(
      "blur(2px) brightness(120%) hue-rotate(90deg) sepia(40%)",
    );
  });

  it("clamps values above their maximum", () => {
    const value = generateFilterCSS({
      ...DEFAULT_FILTER,
      grayscale: 500,
    });
    expect(value).toContain("grayscale(100%)");
  });

  it("clamps values below their minimum", () => {
    const value = generateFilterCSS({
      ...DEFAULT_FILTER,
      brightness: -50,
    });
    expect(value).toContain("brightness(0%)");
  });
});
