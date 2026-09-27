import { clamp } from "./shared";

export type FilterState = {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  saturate: number;
  sepia: number;
};

export const DEFAULT_FILTER: FilterState = {
  blur: 0,
  brightness: 100,
  contrast: 110,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  saturate: 130,
  sepia: 0,
};

export const FILTER_RANGES = {
  blur: { min: 0, max: 20, noop: 0 },
  brightness: { min: 0, max: 200, noop: 100 },
  contrast: { min: 0, max: 200, noop: 100 },
  grayscale: { min: 0, max: 100, noop: 0 },
  hueRotate: { min: 0, max: 360, noop: 0 },
  invert: { min: 0, max: 100, noop: 0 },
  saturate: { min: 0, max: 200, noop: 100 },
  sepia: { min: 0, max: 100, noop: 0 },
} as const;

export function generateFilterCSS(state: FilterState): string {
  const blur = clamp(
    state.blur,
    FILTER_RANGES.blur.min,
    FILTER_RANGES.blur.max,
  );
  const brightness = clamp(
    state.brightness,
    FILTER_RANGES.brightness.min,
    FILTER_RANGES.brightness.max,
  );
  const contrast = clamp(
    state.contrast,
    FILTER_RANGES.contrast.min,
    FILTER_RANGES.contrast.max,
  );
  const grayscale = clamp(
    state.grayscale,
    FILTER_RANGES.grayscale.min,
    FILTER_RANGES.grayscale.max,
  );
  const hueRotate = clamp(
    state.hueRotate,
    FILTER_RANGES.hueRotate.min,
    FILTER_RANGES.hueRotate.max,
  );
  const invert = clamp(
    state.invert,
    FILTER_RANGES.invert.min,
    FILTER_RANGES.invert.max,
  );
  const saturate = clamp(
    state.saturate,
    FILTER_RANGES.saturate.min,
    FILTER_RANGES.saturate.max,
  );
  const sepia = clamp(
    state.sepia,
    FILTER_RANGES.sepia.min,
    FILTER_RANGES.sepia.max,
  );

  const parts: string[] = [];

  if (blur !== FILTER_RANGES.blur.noop) parts.push(`blur(${blur}px)`);
  if (brightness !== FILTER_RANGES.brightness.noop)
    parts.push(`brightness(${brightness}%)`);
  if (contrast !== FILTER_RANGES.contrast.noop)
    parts.push(`contrast(${contrast}%)`);
  if (grayscale !== FILTER_RANGES.grayscale.noop)
    parts.push(`grayscale(${grayscale}%)`);
  if (hueRotate !== FILTER_RANGES.hueRotate.noop)
    parts.push(`hue-rotate(${hueRotate}deg)`);
  if (invert !== FILTER_RANGES.invert.noop) parts.push(`invert(${invert}%)`);
  if (saturate !== FILTER_RANGES.saturate.noop)
    parts.push(`saturate(${saturate}%)`);
  if (sepia !== FILTER_RANGES.sepia.noop) parts.push(`sepia(${sepia}%)`);

  return parts.length > 0 ? parts.join(" ") : "none";
}
