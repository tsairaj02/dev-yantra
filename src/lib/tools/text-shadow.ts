import { clamp } from "./shared";
import { hexToRgb } from "./box-shadow";

export type TextShadowState = {
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
  opacity: number;
};

export const DEFAULT_TEXT_SHADOW: TextShadowState = {
  offsetX: 2,
  offsetY: 2,
  blur: 4,
  color: "#000000",
  opacity: 50,
};

export function generateTextShadowCSS(state: TextShadowState): string {
  const rgb = hexToRgb(state.color) ?? { r: 0, g: 0, b: 0 };
  const alpha = Math.round(clamp(state.opacity, 0, 100)) / 100;

  return `${state.offsetX}px ${state.offsetY}px ${state.blur}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}
