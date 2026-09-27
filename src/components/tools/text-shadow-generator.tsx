"use client";

import { useState } from "react";
import {
  type TextShadowState,
  DEFAULT_TEXT_SHADOW,
  generateTextShadowCSS,
} from "@/lib/tools/text-shadow";
import { clamp } from "@/lib/tools/shared";
import { NumberSliderField } from "./number-slider-field";

type NumericField = "offsetX" | "offsetY" | "blur" | "opacity";

const FIELD_CONFIG: Record<
  NumericField,
  { label: string; min: number; max: number; unit: string }
> = {
  offsetX: { label: "Offset X", min: -50, max: 50, unit: "px" },
  offsetY: { label: "Offset Y", min: -50, max: 50, unit: "px" },
  blur: { label: "Blur", min: 0, max: 50, unit: "px" },
  opacity: { label: "Opacity", min: 0, max: 100, unit: "%" },
};

export function TextShadowGenerator() {
  const [state, setState] = useState<TextShadowState>(DEFAULT_TEXT_SHADOW);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const cssValue = generateTextShadowCSS(state);
  const declaration = `text-shadow: ${cssValue};`;

  function updateNumericField(field: NumericField, rawValue: number) {
    const { min, max } = FIELD_CONFIG[field];
    setState((prev) => ({ ...prev, [field]: clamp(rawValue, min, max) }));
  }

  function handleReset() {
    setState(DEFAULT_TEXT_SHADOW);
    setCopyStatus("idle");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(declaration);
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
        {(Object.keys(FIELD_CONFIG) as NumericField[]).map((field) => {
          const { label, min, max, unit } = FIELD_CONFIG[field];
          return (
            <NumberSliderField
              key={field}
              label={label}
              min={min}
              max={max}
              unit={unit}
              value={state[field]}
              onChange={(value) => updateNumericField(field, value)}
            />
          );
        })}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="text-shadow-color" className="text-sm font-medium">
            Color
          </label>
          <div className="flex items-center gap-3">
            <input
              id="text-shadow-color"
              type="color"
              value={state.color}
              onChange={(e) =>
                setState((prev) => ({ ...prev, color: e.target.value }))
              }
              className="h-10 w-14 cursor-pointer rounded border border-black/[.08] dark:border-white/[.145]"
            />
            <span className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
              {state.color}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start rounded-full border border-black/[.08] px-4 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
        >
          Reset
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex min-h-[220px] flex-1 items-center justify-center rounded-lg bg-zinc-100 p-8 dark:bg-zinc-900">
          <p
            className="text-center text-4xl font-semibold text-zinc-900 dark:text-zinc-50"
            style={{ textShadow: cssValue }}
          >
            Dev Yantra
          </p>
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
          <pre className="code-scroll overflow-x-auto rounded-lg bg-zinc-100 p-4 font-mono text-sm dark:bg-zinc-900">
            {declaration}
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
