"use client";

import { useState } from "react";
import {
  DEFAULT_FLEXBOX,
  GAP_MAX,
  GAP_MIN,
  type AlignContent,
  type AlignItems,
  type Display,
  type FlexDirection,
  type FlexWrap,
  type FlexboxState,
  type JustifyContent,
  generateFlexboxCSS,
} from "@/lib/tools/flexbox";
import { clamp } from "@/lib/tools/shared";
import { NumberSliderField } from "./number-slider-field";
import { SelectField } from "./select-field";

const DISPLAY_OPTIONS: { value: Display; label: string }[] = [
  { value: "flex", label: "flex" },
  { value: "inline-flex", label: "inline-flex" },
];

const FLEX_DIRECTION_OPTIONS: { value: FlexDirection; label: string }[] = [
  { value: "row", label: "row" },
  { value: "row-reverse", label: "row-reverse" },
  { value: "column", label: "column" },
  { value: "column-reverse", label: "column-reverse" },
];

const FLEX_WRAP_OPTIONS: { value: FlexWrap; label: string }[] = [
  { value: "nowrap", label: "nowrap" },
  { value: "wrap", label: "wrap" },
  { value: "wrap-reverse", label: "wrap-reverse" },
];

const JUSTIFY_CONTENT_OPTIONS: { value: JustifyContent; label: string }[] = [
  { value: "flex-start", label: "flex-start" },
  { value: "flex-end", label: "flex-end" },
  { value: "center", label: "center" },
  { value: "space-between", label: "space-between" },
  { value: "space-around", label: "space-around" },
  { value: "space-evenly", label: "space-evenly" },
];

const ALIGN_ITEMS_OPTIONS: { value: AlignItems; label: string }[] = [
  { value: "stretch", label: "stretch" },
  { value: "flex-start", label: "flex-start" },
  { value: "flex-end", label: "flex-end" },
  { value: "center", label: "center" },
  { value: "baseline", label: "baseline" },
];

const ALIGN_CONTENT_OPTIONS: { value: AlignContent; label: string }[] = [
  { value: "stretch", label: "stretch" },
  { value: "flex-start", label: "flex-start" },
  { value: "flex-end", label: "flex-end" },
  { value: "center", label: "center" },
  { value: "space-between", label: "space-between" },
  { value: "space-around", label: "space-around" },
  { value: "space-evenly", label: "space-evenly" },
];

const PREVIEW_ITEMS = [1, 2, 3, 4, 5];

export function FlexboxGenerator() {
  const [state, setState] = useState<FlexboxState>(DEFAULT_FLEXBOX);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const cssValue = generateFlexboxCSS(state);

  function updateGap(rawValue: number) {
    const value = clamp(rawValue, GAP_MIN, GAP_MAX);
    setState((prev) => ({
      ...prev,
      gap: value,
      rowGap: value,
      columnGap: value,
    }));
  }

  function updateRowGap(rawValue: number) {
    setState((prev) => ({
      ...prev,
      rowGap: clamp(rawValue, GAP_MIN, GAP_MAX),
    }));
  }

  function updateColumnGap(rawValue: number) {
    setState((prev) => ({
      ...prev,
      columnGap: clamp(rawValue, GAP_MIN, GAP_MAX),
    }));
  }

  function handleReset() {
    setState(DEFAULT_FLEXBOX);
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
        <SelectField
          label="display"
          value={state.display}
          options={DISPLAY_OPTIONS}
          onChange={(value) =>
            setState((prev) => ({ ...prev, display: value }))
          }
        />
        <SelectField
          label="flex-direction"
          value={state.flexDirection}
          options={FLEX_DIRECTION_OPTIONS}
          onChange={(value) =>
            setState((prev) => ({ ...prev, flexDirection: value }))
          }
        />
        <SelectField
          label="flex-wrap"
          value={state.flexWrap}
          options={FLEX_WRAP_OPTIONS}
          onChange={(value) =>
            setState((prev) => ({ ...prev, flexWrap: value }))
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
          label="align-items"
          value={state.alignItems}
          options={ALIGN_ITEMS_OPTIONS}
          onChange={(value) =>
            setState((prev) => ({ ...prev, alignItems: value }))
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

        <div className="flex items-center gap-2 text-sm font-medium">
          <input
            id="linked-gap"
            type="checkbox"
            checked={state.linkedGap}
            onChange={(e) =>
              setState((prev) => ({ ...prev, linkedGap: e.target.checked }))
            }
            aria-label="Use a single gap value"
            className="h-4 w-4 cursor-pointer"
          />
          <span>Use a single gap value</span>
        </div>

        {state.linkedGap ? (
          <NumberSliderField
            label="Gap"
            min={GAP_MIN}
            max={GAP_MAX}
            unit="px"
            value={state.gap}
            onChange={updateGap}
          />
        ) : (
          <>
            <NumberSliderField
              label="Row Gap"
              min={GAP_MIN}
              max={GAP_MAX}
              unit="px"
              value={state.rowGap}
              onChange={updateRowGap}
            />
            <NumberSliderField
              label="Column Gap"
              min={GAP_MIN}
              max={GAP_MAX}
              unit="px"
              value={state.columnGap}
              onChange={updateColumnGap}
            />
          </>
        )}

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
          className="min-h-[260px] flex-1 rounded-lg border-2 border-dashed border-black/[.15] bg-zinc-50 p-4 dark:border-white/[.2] dark:bg-zinc-900"
          style={{
            display: state.display,
            flexDirection: state.flexDirection,
            flexWrap: state.flexWrap,
            justifyContent: state.justifyContent,
            alignItems: state.alignItems,
            alignContent: state.alignContent,
            gap: state.linkedGap
              ? `${clamp(state.gap, GAP_MIN, GAP_MAX)}px`
              : `${clamp(state.rowGap, GAP_MIN, GAP_MAX)}px ${clamp(
                  state.columnGap,
                  GAP_MIN,
                  GAP_MAX,
                )}px`,
          }}
        >
          {PREVIEW_ITEMS.map((item) => (
            <div
              key={item}
              className="flex min-h-12 min-w-12 items-center justify-center rounded-md bg-foreground px-3 font-mono text-sm text-background"
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
