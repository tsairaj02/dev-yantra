import type { Metadata } from "next";
import { GridGenerator } from "@/components/tools/grid-generator";
import { ToolBreadcrumb } from "@/components/layout/tool-breadcrumb";

export const metadata: Metadata = {
  title: "CSS Grid Generator - Dev Yantra",
  description:
    "Visually configure CSS Grid container properties with a live preview. Adjust columns, rows, gaps, alignment, and auto-flow, then copy the CSS.",
};

export default function GridGeneratorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16">
      <ToolBreadcrumb toolSlug="grid-generator" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          CSS Grid Generator
        </h1>
        <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
          Configure the grid container properties, preview the layout live with
          sample items, and copy the generated CSS.
        </p>
      </div>
      <GridGenerator />
    </div>
  );
}
