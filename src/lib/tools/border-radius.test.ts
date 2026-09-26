import { describe, expect, it } from "vitest";
import {
  DEFAULT_BORDER_RADIUS,
  generateBorderRadiusCSS,
} from "./border-radius";

describe("generateBorderRadiusCSS", () => {
  it("generates a single value when all corners match", () => {
    expect(generateBorderRadiusCSS(DEFAULT_BORDER_RADIUS)).toBe("12px");
  });

  it("generates four values in top-left, top-right, bottom-right, bottom-left order when corners differ", () => {
    const value = generateBorderRadiusCSS({
      topLeft: 4,
      topRight: 8,
      bottomRight: 16,
      bottomLeft: 32,
      linked: false,
    });
    expect(value).toBe("4px 8px 16px 32px");
  });

  it("clamps negative values to the minimum", () => {
    const value = generateBorderRadiusCSS({
      ...DEFAULT_BORDER_RADIUS,
      topLeft: -20,
    });
    expect(value).toBe("0px 12px 12px 12px");
  });

  it("clamps values above the maximum", () => {
    const value = generateBorderRadiusCSS({
      ...DEFAULT_BORDER_RADIUS,
      topLeft: 9999,
    });
    expect(value).toBe("200px 12px 12px 12px");
  });
});
