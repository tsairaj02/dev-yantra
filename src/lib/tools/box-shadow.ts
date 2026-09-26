import { clamp } from "./shared";

export { clamp };

export type BoxShadowState = {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string; // hex, e.g. "#000000"
  opacity: number; // 0-100
  inset: boolean;
};

export const DEFAULT_BOX_SHADOW: BoxShadowState = {
  offsetX: 0,
  offsetY: 4,
  blur: 12,
  spread: 0,
  color: "#000000",
  opacity: 20,
  inset: false,
};

export function hexToRgb(
  hex: string,
): { r: number; g: number; b: number } | null {
  const normalized = hex.trim().replace(/^#/, "");
  const isShort = normalized.length === 3;
  const isFull = normalized.length === 6;
  if (!isShort && !isFull) return null;

  const expanded = isShort
    ? normalized
        .split("")
        .map((c) => c + c)
        .join("")
    : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return null;

  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16),
  };
}

export function generateBoxShadowCSS(state: BoxShadowState): string {
  const rgb = hexToRgb(state.color) ?? { r: 0, g: 0, b: 0 };
  const alpha = Math.round(clamp(state.opacity, 0, 100)) / 100;
  const insetPrefix = state.inset ? "inset " : "";

  return `${insetPrefix}${state.offsetX}px ${state.offsetY}px ${state.blur}px ${state.spread}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}
