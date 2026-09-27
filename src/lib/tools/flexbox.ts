import { clamp } from "./shared";

export type Display = "flex" | "inline-flex";
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
export type AlignItems =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline";
export type AlignContent =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type FlexboxState = {
  display: Display;
  flexDirection: FlexDirection;
  flexWrap: FlexWrap;
  justifyContent: JustifyContent;
  alignItems: AlignItems;
  alignContent: AlignContent;
  linkedGap: boolean;
  gap: number;
  rowGap: number;
  columnGap: number;
};

export const GAP_MIN = 0;
export const GAP_MAX = 100;

export const DEFAULT_FLEXBOX: FlexboxState = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "stretch",
  alignContent: "stretch",
  linkedGap: true,
  gap: 16,
  rowGap: 16,
  columnGap: 16,
};

export function generateFlexboxCSS(state: FlexboxState): string {
  const lines = [
    `display: ${state.display};`,
    `flex-direction: ${state.flexDirection};`,
    `flex-wrap: ${state.flexWrap};`,
    `justify-content: ${state.justifyContent};`,
    `align-items: ${state.alignItems};`,
    `align-content: ${state.alignContent};`,
  ];

  if (state.linkedGap) {
    lines.push(`gap: ${clamp(state.gap, GAP_MIN, GAP_MAX)}px;`);
  } else {
    lines.push(`row-gap: ${clamp(state.rowGap, GAP_MIN, GAP_MAX)}px;`);
    lines.push(`column-gap: ${clamp(state.columnGap, GAP_MIN, GAP_MAX)}px;`);
  }

  return lines.join("\n");
}
