"use client";

import { useState } from "react";
import {
  DEFAULT_FILTER,
  FILTER_RANGES,
  type FilterState,
  generateFilterCSS,
} from "@/lib/tools/filter";
import { clamp } from "@/lib/tools/shared";
import { NumberSliderField } from "./number-slider-field";

type FilterField = keyof FilterState;

const FIELD_CONFIG: Record<FilterField, { label: string; unit: string }> = {
  blur: { label: "Blur", unit: "px" },
  brightness: { label: "Brightness", unit: "%" },
  contrast: { label: "Contrast", unit: "%" },
  grayscale: { label: "Grayscale", unit: "%" },
  hueRotate: { label: "Hue Rotate", unit: "deg" },
  invert: { label: "Invert", unit: "%" },
  saturate: { label: "Saturate", unit: "%" },
  sepia: { label: "Sepia", unit: "%" },
};

const FIELD_ORDER: FilterField[] = [
  "blur",
  "brightness",
  "contrast",
  "grayscale",
  "hueRotate",
  "invert",
  "saturate",
  "sepia",
];

export function FilterGenerator() {
  const [state, setState] = useState<FilterState>(DEFAULT_FILTER);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const cssValue = generateFilterCSS(state);
  const declaration = `filter: ${cssValue};`;

  function updateField(field: FilterField, rawValue: number) {
    const { min, max } = FILTER_RANGES[field];
    setState((prev) => ({ ...prev, [field]: clamp(rawValue, min, max) }));
  }

  function handleReset() {
    setState(DEFAULT_FILTER);
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
        {FIELD_ORDER.map((field) => {
          const { label, unit } = FIELD_CONFIG[field];
          const { min, max } = FILTER_RANGES[field];
          return (
            <NumberSliderField
              key={field}
              label={label}
              min={min}
              max={max}
              unit={unit}
              value={state[field]}
              onChange={(value) => updateField(field, value)}
            />
          );
        })}

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
          <div
            className="h-40 w-40 rounded-lg"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #ff0000 0%, #eab308 33%, #22c55e 66%, #3b82f6 100%)",
              filter: cssValue,
            }}
          />
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
