import type { Metadata } from "next";
import { GradientGenerator } from "@/components/tools/gradient-generator";
import { ToolBreadcrumb } from "@/components/layout/tool-breadcrumb";

export const metadata: Metadata = {
  title: "CSS Gradient Generator - Dev Yantra",
  description:
    "Generate CSS linear and radial gradients visually with a live preview. Add color stops, adjust angle and position, then copy the CSS.",
};

export default function GradientGeneratorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16">
      <ToolBreadcrumb toolSlug="gradient-generator" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          CSS Gradient Generator
        </h1>
        <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
          Build a linear or radial gradient with multiple color stops, preview
          it live, and copy the generated CSS.
        </p>
      </div>
      <GradientGenerator />
    </div>
  );
}
