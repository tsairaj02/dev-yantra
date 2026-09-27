"use client";

import { useState } from "react";
import {
  type BorderRadiusState,
  DEFAULT_BORDER_RADIUS,
  RADIUS_MAX,
  RADIUS_MIN,
  generateBorderRadiusCSS,
} from "@/lib/tools/border-radius";
import { clamp } from "@/lib/tools/shared";
import { NumberSliderField } from "./number-slider-field";

type CornerField = "topLeft" | "topRight" | "bottomRight" | "bottomLeft";

const CORNER_LABELS: Record<CornerField, string> = {
  topLeft: "Top Left",
  topRight: "Top Right",
  bottomRight: "Bottom Right",
  bottomLeft: "Bottom Left",
};

const CORNER_ORDER: CornerField[] = [
  "topLeft",
  "topRight",
  "bottomRight",
  "bottomLeft",
];

export function BorderRadiusGenerator() {
  const [state, setState] = useState<BorderRadiusState>(DEFAULT_BORDER_RADIUS);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const cssValue = generateBorderRadiusCSS(state);
  const declaration = `border-radius: ${cssValue};`;

  function updateCorner(field: CornerField, rawValue: number) {
    const value = clamp(rawValue, RADIUS_MIN, RADIUS_MAX);
    setState((prev) => ({ ...prev, [field]: value }));
  }

  function updateAllCorners(rawValue: number) {
    const value = clamp(rawValue, RADIUS_MIN, RADIUS_MAX);
    setState((prev) => ({
      ...prev,
      topLeft: value,
      topRight: value,
      bottomRight: value,
      bottomLeft: value,
    }));
  }

  function handleReset() {
    setState(DEFAULT_BORDER_RADIUS);
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
        <div className="flex items-center gap-2 text-sm font-medium">
          <input
            id="link-corners"
            type="checkbox"
            checked={state.linked}
            onChange={(e) =>
              setState((prev) => ({ ...prev, linked: e.target.checked }))
            }
            aria-label="Link corners"
            className="h-4 w-4 cursor-pointer"
          />
          <span>Link corners</span>
        </div>

        {state.linked ? (
          <NumberSliderField
            label="All corners"
            min={RADIUS_MIN}
            max={RADIUS_MAX}
            unit="px"
            value={state.topLeft}
            onChange={updateAllCorners}
          />
        ) : (
          CORNER_ORDER.map((field) => (
            <NumberSliderField
              key={field}
              label={CORNER_LABELS[field]}
              min={RADIUS_MIN}
              max={RADIUS_MAX}
              unit="px"
              value={state[field]}
              onChange={(value) => updateCorner(field, value)}
            />
          ))
        )}

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
            className="h-40 w-40 bg-white dark:bg-zinc-800"
            style={{
              borderTopLeftRadius: state.topLeft,
              borderTopRightRadius: state.topRight,
              borderBottomRightRadius: state.bottomRight,
              borderBottomLeftRadius: state.bottomLeft,
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
