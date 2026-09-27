"use client";

import { useRef, useState } from "react";
import {
  ANGLE_MAX,
  ANGLE_MIN,
  DEFAULT_GRADIENT,
  MIN_STOPS,
  POSITION_MAX,
  POSITION_MIN,
  type ColorStop,
  type GradientState,
  generateGradientCSS,
} from "@/lib/tools/gradient";
import { clamp } from "@/lib/tools/shared";
import { NumberSliderField } from "./number-slider-field";

const NEW_STOP_COLORS = ["#22c55e", "#eab308", "#a855f7", "#ec4899", "#06b6d4"];

export function GradientGenerator() {
  const [state, setState] = useState<GradientState>(DEFAULT_GRADIENT);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const nextStopNumber = useRef(state.stops.length + 1);
  const nextColorIndex = useRef(0);

  const cssValue = generateGradientCSS(state);
  const declaration = `background: ${cssValue};`;

  function updateStopColor(id: string, color: string) {
    setState((prev) => ({
      ...prev,
      stops: prev.stops.map((stop) =>
        stop.id === id ? { ...stop, color } : stop,
      ),
    }));
  }

  function updateStopPosition(id: string, rawValue: number) {
    const position = clamp(rawValue, POSITION_MIN, POSITION_MAX);
    setState((prev) => ({
      ...prev,
      stops: prev.stops.map((stop) =>
        stop.id === id ? { ...stop, position } : stop,
      ),
    }));
  }

  function addStop() {
    setState((prev) => {
      const id = `stop-${nextStopNumber.current}`;
      nextStopNumber.current += 1;
      const color =
        NEW_STOP_COLORS[nextColorIndex.current % NEW_STOP_COLORS.length];
      nextColorIndex.current += 1;
      const lastPosition = prev.stops[prev.stops.length - 1]?.position ?? 100;
      const newStop: ColorStop = {
        id,
        color,
        position: clamp(lastPosition, POSITION_MIN, POSITION_MAX),
      };
      return { ...prev, stops: [...prev.stops, newStop] };
    });
  }

  function removeStop(id: string) {
    setState((prev) => {
      if (prev.stops.length <= MIN_STOPS) return prev;
      return { ...prev, stops: prev.stops.filter((stop) => stop.id !== id) };
    });
  }

  function handleReset() {
    setState(DEFAULT_GRADIENT);
    nextStopNumber.current = DEFAULT_GRADIENT.stops.length + 1;
    nextColorIndex.current = 0;
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
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Type</legend>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="gradient-type"
                value="linear"
                checked={state.type === "linear"}
                onChange={() =>
                  setState((prev) => ({ ...prev, type: "linear" }))
                }
                className="h-4 w-4 cursor-pointer"
              />
              Linear
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="gradient-type"
                value="radial"
                checked={state.type === "radial"}
                onChange={() =>
                  setState((prev) => ({ ...prev, type: "radial" }))
                }
                className="h-4 w-4 cursor-pointer"
              />
              Radial
            </label>
          </div>
        </fieldset>

        {state.type === "linear" && (
          <NumberSliderField
            label="Angle"
            min={ANGLE_MIN}
            max={ANGLE_MAX}
            unit="deg"
            value={state.angle}
            onChange={(value) =>
              setState((prev) => ({
                ...prev,
                angle: clamp(value, ANGLE_MIN, ANGLE_MAX),
              }))
            }
          />
        )}

        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium">Color stops</span>
          {state.stops.map((stop, index) => (
            <div
              key={stop.id}
              className="flex flex-col gap-3 rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]"
            >
              <div className="flex items-center justify-between">
                <label
                  htmlFor={`stop-color-${stop.id}`}
                  className="text-sm font-medium"
                >
                  Stop {index + 1}
                </label>
                <button
                  type="button"
                  onClick={() => removeStop(stop.id)}
                  disabled={state.stops.length <= MIN_STOPS}
                  aria-label={`Remove stop ${index + 1}`}
                  className="text-sm text-zinc-600 underline decoration-dotted disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-400"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center gap-3">
                <input
                  id={`stop-color-${stop.id}`}
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStopColor(stop.id, e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-black/[.08] dark:border-white/[.145]"
                />
                <span className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
                  {stop.color}
                </span>
              </div>
              <NumberSliderField
                label={`Stop ${index + 1} position`}
                min={POSITION_MIN}
                max={POSITION_MAX}
                unit="%"
                value={stop.position}
                onChange={(value) => updateStopPosition(stop.id, value)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addStop}
            className="self-start rounded-full border border-black/[.08] px-4 py-2 text-sm font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08]"
          >
            Add color stop
          </button>
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
        <div
          className="min-h-[220px] flex-1 rounded-lg"
          style={{ background: cssValue }}
        />

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
