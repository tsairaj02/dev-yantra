import { clamp } from "./shared";

export type JustifyItems = "start" | "end" | "center" | "stretch";
export type AlignItems = "start" | "end" | "center" | "stretch";
export type JustifyContent =
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "space-between"
  | "space-around"
  | "space-evenly";
export type AlignContent = JustifyContent;
export type GridAutoFlow = "row" | "column" | "row dense" | "column dense";

export type GridState = {
  columns: number;
  rows: number;
  columnGap: number;
  rowGap: number;
  justifyItems: JustifyItems;
  alignItems: AlignItems;
  justifyContent: JustifyContent;
  alignContent: AlignContent;
  gridAutoFlow: GridAutoFlow;
};

export const COLUMNS_MIN = 1;
export const COLUMNS_MAX = 12;
export const ROWS_MIN = 1;
export const ROWS_MAX = 8;
export const GAP_MIN = 0;
export const GAP_MAX = 100;
export const TRACK_SIZE_PX = 60;

export const DEFAULT_GRID: GridState = {
  columns: 4,
  rows: 3,
  columnGap: 16,
  rowGap: 16,
  justifyItems: "stretch",
  alignItems: "stretch",
  justifyContent: "start",
  alignContent: "start",
  gridAutoFlow: "row",
};

export function generateGridCSS(state: GridState): string {
  const columns = clamp(state.columns, COLUMNS_MIN, COLUMNS_MAX);
  const rows = clamp(state.rows, ROWS_MIN, ROWS_MAX);
  const columnGap = clamp(state.columnGap, GAP_MIN, GAP_MAX);
  const rowGap = clamp(state.rowGap, GAP_MIN, GAP_MAX);

  return [
    "display: grid;",
    `grid-template-columns: repeat(${columns}, ${TRACK_SIZE_PX}px);`,
    `grid-template-rows: repeat(${rows}, ${TRACK_SIZE_PX}px);`,
    `column-gap: ${columnGap}px;`,
    `row-gap: ${rowGap}px;`,
    `justify-items: ${state.justifyItems};`,
    `align-items: ${state.alignItems};`,
    `justify-content: ${state.justifyContent};`,
    `align-content: ${state.alignContent};`,
    `grid-auto-flow: ${state.gridAutoFlow};`,
  ].join("\n");
}
