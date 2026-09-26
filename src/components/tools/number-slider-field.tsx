"use client";

import { useId } from "react";

export function NumberSliderField({
  label,
  min,
  max,
  unit,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  unit: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const id = useId();

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
