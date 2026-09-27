import { clamp } from "./shared";

export type GradientType = "linear" | "radial";

export type ColorStop = {
  id: string;
  color: string;
  position: number;
};

export type GradientState = {
  type: GradientType;
  angle: number;
  stops: ColorStop[];
};

export const ANGLE_MIN = 0;
export const ANGLE_MAX = 360;
export const POSITION_MIN = 0;
export const POSITION_MAX = 100;
export const MIN_STOPS = 2;

export const DEFAULT_GRADIENT: GradientState = {
  type: "linear",
  angle: 90,
  stops: [
    { id: "stop-1", color: "#ff0000", position: 0 },
    { id: "stop-2", color: "#0000ff", position: 100 },
  ],
};

export function generateGradientCSS(state: GradientState): string {
  const stopsCSS = state.stops
    .map(
      (stop) =>
        `${stop.color} ${clamp(stop.position, POSITION_MIN, POSITION_MAX)}%`,
    )
    .join(", ");

  if (state.type === "radial") {
    return `radial-gradient(circle, ${stopsCSS})`;
  }

  const angle = clamp(state.angle, ANGLE_MIN, ANGLE_MAX);
  return `linear-gradient(${angle}deg, ${stopsCSS})`;
}
