import type { Metadata } from "next";
import { FilterGenerator } from "@/components/tools/filter-generator";
import { ToolBreadcrumb } from "@/components/layout/tool-breadcrumb";

export const metadata: Metadata = {
  title: "CSS Filter Generator - Dev Yantra",
  description:
    "Generate CSS filter values visually with a live preview. Adjust blur, brightness, contrast, grayscale, hue rotate, invert, saturate, and sepia, then copy the CSS.",
};

export default function FilterGeneratorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16">
      <ToolBreadcrumb toolSlug="filter-generator" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          CSS Filter Generator
        </h1>
        <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
          Adjust the controls to build a filter, preview it live, and copy the
          generated CSS.
        </p>
      </div>
      <FilterGenerator />
    </div>
  );
}
