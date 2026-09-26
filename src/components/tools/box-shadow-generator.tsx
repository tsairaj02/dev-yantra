"use client";

import { useId, useState } from "react";
import {
  type BoxShadowState,
  DEFAULT_BOX_SHADOW,
  clamp,
  generateBoxShadowCSS,
} from "@/lib/tools/box-shadow";

type NumericField = "offsetX" | "offsetY" | "blur" | "spread" | "opacity";

const FIELD_CONFIG: Record<
  NumericField,
  { label: string; min: number; max: number; unit: string }
> = {
  offsetX: { label: "Offset X", min: -100, max: 100, unit: "px" },
  offsetY: { label: "Offset Y", min: -100, max: 100, unit: "px" },
  blur: { label: "Blur", min: 0, max: 100, unit: "px" },
  spread: { label: "Spread", min: -50, max: 50, unit: "px" },
  opacity: { label: "Opacity", min: 0, max: 100, unit: "%" },
};

export function BoxShadowGenerator() {
  const [state, setState] = useState<BoxShadowState>(DEFAULT_BOX_SHADOW);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const cssValue = generateBoxShadowCSS(state);
  const declaration = `box-shadow: ${cssValue};`;

  function updateNumericField(field: NumericField, rawValue: number) {
    const { min, max } = FIELD_CONFIG[field];
    setState((prev) => ({ ...prev, [field]: clamp(rawValue, min, max) }));
  }

  function handleReset() {
    setState(DEFAULT_BOX_SHADOW);
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
      <div className="flex flex-1 flex-col gap-6">
        {(Object.keys(FIELD_CONFIG) as NumericField[]).map((field) => (
          <NumberSliderField
            key={field}
            field={field}
            value={state[field]}
            onChange={(value) => updateNumericField(field, value)}
          />
        ))}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="shadow-color" className="text-sm font-medium">
            Color
          </label>
          <div className="flex items-center gap-3">
            <input
              id="shadow-color"
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

        <div className="flex items-center gap-2 text-sm font-medium">
          <input
            id="inset-shadow"
            type="checkbox"
            checked={state.inset}
            onChange={(e) =>
              setState((prev) => ({ ...prev, inset: e.target.checked }))
            }
            aria-label="Inset shadow"
            className="h-4 w-4 cursor-pointer"
          />
          <span>Inset shadow</span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start rounded-full border border-black/[.08] px-4 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex min-h-[220px] flex-1 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <div
            className="h-32 w-32 rounded-lg bg-white dark:bg-zinc-800"
            style={{ boxShadow: cssValue }}
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
          <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-4 font-mono text-sm dark:bg-zinc-900">
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

function NumberSliderField({
  field,
  value,
  onChange,
}: {
  field: NumericField;
  value: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  const { label, min, max, unit } = FIELD_CONFIG[field];

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {value}
          {unit}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`${label} (${unit}) number input`}
          className="w-20 rounded border border-black/[.08] px-2 py-1 text-sm dark:border-white/[.145] dark:bg-transparent"
        />
      </div>
    </div>
  );
}
