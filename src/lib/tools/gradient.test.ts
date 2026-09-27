import { describe, expect, it } from "vitest";
import { DEFAULT_GRADIENT, generateGradientCSS } from "./gradient";

describe("generateGradientCSS", () => {
  it("generates the default linear gradient", () => {
    expect(generateGradientCSS(DEFAULT_GRADIENT)).toBe(
      "linear-gradient(90deg, #ff0000 0%, #0000ff 100%)",
    );
  });

  it("generates a radial gradient", () => {
    const value = generateGradientCSS({ ...DEFAULT_GRADIENT, type: "radial" });
    expect(value).toBe("radial-gradient(circle, #ff0000 0%, #0000ff 100%)");
  });

  it("clamps the angle above 360", () => {
    const value = generateGradientCSS({ ...DEFAULT_GRADIENT, angle: 999 });
    expect(value).toContain("linear-gradient(360deg");
  });

  it("clamps the angle below 0", () => {
    const value = generateGradientCSS({ ...DEFAULT_GRADIENT, angle: -50 });
    expect(value).toContain("linear-gradient(0deg");
  });

  it("clamps stop positions to 0-100", () => {
    const value = generateGradientCSS({
      ...DEFAULT_GRADIENT,
      stops: [
        { id: "a", color: "#000000", position: -20 },
        { id: "b", color: "#ffffff", position: 150 },
      ],
    });
    expect(value).toBe("linear-gradient(90deg, #000000 0%, #ffffff 100%)");
  });

  it("supports more than two stops", () => {
    const value = generateGradientCSS({
      ...DEFAULT_GRADIENT,
      stops: [
        { id: "a", color: "#ff0000", position: 0 },
        { id: "b", color: "#00ff00", position: 50 },
        { id: "c", color: "#0000ff", position: 100 },
      ],
    });
    expect(value).toBe(
      "linear-gradient(90deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)",
    );
  });
});
