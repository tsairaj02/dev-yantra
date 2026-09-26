import { clamp } from "./shared";

export type BorderRadiusState = {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  linked: boolean;
};

export const DEFAULT_BORDER_RADIUS: BorderRadiusState = {
  topLeft: 12,
  topRight: 12,
  bottomRight: 12,
  bottomLeft: 12,
  linked: true,
};

export const RADIUS_MIN = 0;
export const RADIUS_MAX = 200;

export function generateBorderRadiusCSS(state: BorderRadiusState): string {
  const topLeft = clamp(state.topLeft, RADIUS_MIN, RADIUS_MAX);
  const topRight = clamp(state.topRight, RADIUS_MIN, RADIUS_MAX);
  const bottomRight = clamp(state.bottomRight, RADIUS_MIN, RADIUS_MAX);
  const bottomLeft = clamp(state.bottomLeft, RADIUS_MIN, RADIUS_MAX);

  if (
    topLeft === topRight &&
    topRight === bottomRight &&
    bottomRight === bottomLeft
  ) {
    return `${topLeft}px`;
  }

  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
}
