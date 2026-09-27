"use client";

import { useState } from "react";
import {
  COLUMNS_MAX,
  COLUMNS_MIN,
  DEFAULT_GRID,
  GAP_MAX,
  GAP_MIN,
  ROWS_MAX,
  ROWS_MIN,
  TRACK_SIZE_PX,
  type AlignContent,
  type AlignItems,
  type GridAutoFlow,
  type GridState,
  type JustifyContent,
  type JustifyItems,
  generateGridCSS,
} from "@/lib/tools/grid";
import { clamp } from "@/lib/tools/shared";
import { NumberSliderField } from "./number-slider-field";
import { SelectField } from "./select-field";

const JUSTIFY_ITEMS_OPTIONS: { value: JustifyItems; label: string }[] = [
  { value: "stretch", label: "stretch" },
  { value: "start", label: "start" },
  { value: "end", label: "end" },
  { value: "center", label: "center" },
];

const ALIGN_ITEMS_OPTIONS: { value: AlignItems; label: string }[] = [
  { value: "stretch", label: "stretch" },
  { value: "start", label: "start" },
  { value: "end", label: "end" },
  { value: "center", label: "center" },
];

const JUSTIFY_CONTENT_OPTIONS: { value: JustifyContent; label: string }[] = [
  { value: "start", label: "start" },
  { value: "end", label: "end" },
  { value: "center", label: "center" },
  { value: "stretch", label: "stretch" },
  { value: "space-between", label: "space-between" },
  { value: "space-around", label: "space-around" },
  { value: "space-evenly", label: "space-evenly" },
];

const ALIGN_CONTENT_OPTIONS: { value: AlignContent; label: string }[] =
  JUSTIFY_CONTENT_OPTIONS;

const GRID_AUTO_FLOW_OPTIONS: { value: GridAutoFlow; label: string }[] = [
  { value: "row", label: "row" },
  { value: "column", label: "column" },
  { value: "row dense", label: "row dense" },
  { value: "column dense", label: "column dense" },
];

const PREVIEW_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8];

export function GridGenerator() {
  const [state, setState] = useState<GridState>(DEFAULT_GRID);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const cssValue = generateGridCSS(state);

  function updateColumns(rawValue: number) {
    setState((prev) => ({
      ...prev,
      columns: clamp(rawValue, COLUMNS_MIN, COLUMNS_MAX),
    }));
  }

  function updateRows(rawValue: number) {
    setState((prev) => ({
      ...prev,
      rows: clamp(rawValue, ROWS_MIN, ROWS_MAX),
    }));
  }

  function updateColumnGap(rawValue: number) {
    setState((prev) => ({
      ...prev,
      columnGap: clamp(rawValue, GAP_MIN, GAP_MAX),
    }));
  }

  function updateRowGap(rawValue: number) {
    setState((prev) => ({
      ...prev,
      rowGap: clamp(rawValue, GAP_MIN, GAP_MAX),
    }));
  }

  function handleReset() {
    setState(DEFAULT_GRID);
    setCopyStatus("idle");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(cssValue);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    } finally {
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <NumberSliderField
          label="Columns"
          min={COLUMNS_MIN}
          max={COLUMNS_MAX}
          unit=""
          value={state.columns}
          onChange={updateColumns}
        />
        <NumberSliderField
          label="Rows"
          min={ROWS_MIN}
          max={ROWS_MAX}
          unit=""
          value={state.rows}
          onChange={updateRows}
        />
        <NumberSliderField
          label="Column Gap"
          min={GAP_MIN}
          max={GAP_MAX}
          unit="px"
          value={state.columnGap}
          onChange={updateColumnGap}
        />
        <NumberSliderField
          label="Row Gap"
          min={GAP_MIN}
          max={GAP_MAX}
          unit="px"
          value={state.rowGap}
          onChange={updateRowGap}
        />

        <SelectField
          label="justify-items"
          value={state.justifyItems}
          options={JUSTIFY_ITEMS_OPTIONS}
          onChange={(value) =>
            setState((prev) => ({ ...prev, justifyItems: value }))
          }
        />
        <SelectField
          label="align-items"
          value={state.alignItems}
          options={ALIGN_ITEMS_OPTIONS}
          onChange={(value) =>
            setState((prev) => ({ ...prev, alignItems: value }))
          }
        />
        <SelectField
          label="justify-content"
          value={state.justifyContent}
          options={JUSTIFY_CONTENT_OPTIONS}
          onChange={(value) =>
            setState((prev) => ({ ...prev, justifyContent: value }))
          }
        />
        <SelectField
          label="align-content"
          value={state.alignContent}
          options={ALIGN_CONTENT_OPTIONS}
          onChange={(value) =>
            setState((prev) => ({ ...prev, alignContent: value }))
          }
        />
        <SelectField
          label="grid-auto-flow"
          value={state.gridAutoFlow}
          options={GRID_AUTO_FLOW_OPTIONS}
          onChange={(value) =>
            setState((prev) => ({ ...prev, gridAutoFlow: value }))
          }
        />

        <button
          type="button"
          onClick={handleReset}
          className="self-start rounded-full border border-black/[.08] px-4 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
        >
          Reset
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div
          className="min-h-[260px] flex-1 overflow-auto rounded-lg border-2 border-dashed border-black/[.15] bg-zinc-50 p-4 dark:border-white/[.2] dark:bg-zinc-900"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${clamp(
              state.columns,
              COLUMNS_MIN,
              COLUMNS_MAX,
            )}, ${TRACK_SIZE_PX}px)`,
            gridTemplateRows: `repeat(${clamp(
              state.rows,
              ROWS_MIN,
              ROWS_MAX,
            )}, ${TRACK_SIZE_PX}px)`,
            columnGap: clamp(state.columnGap, GAP_MIN, GAP_MAX),
            rowGap: clamp(state.rowGap, GAP_MIN, GAP_MAX),
            justifyItems: state.justifyItems,
            alignItems: state.alignItems,
            justifyContent: state.justifyContent,
            alignContent: state.alignContent,
            gridAutoFlow: state.gridAutoFlow,
          }}
        >
          {PREVIEW_ITEMS.map((item) => (
            <div
              key={item}
              className="flex items-center justify-center rounded-md bg-foreground px-3 py-2 font-mono text-sm text-background"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Generated CSS</span>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              {copyStatus === "copied" ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre
            data-testid="generated-css"
            className="code-scroll overflow-x-auto whitespace-pre rounded-lg bg-zinc-100 p-4 font-mono text-sm dark:bg-zinc-900"
          >
            {cssValue}
          </pre>
          <p
            role="status"
            aria-live="polite"
            className="min-h-[1.25rem] text-sm text-zinc-600 dark:text-zinc-400"
          >
            {copyStatus === "error"
              ? "Couldn't copy automatically — please select and copy the text above."
              : copyStatus === "copied"
                ? "Copied to clipboard."
                : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
