import type { Metadata } from "next";
import { FlexboxGenerator } from "@/components/tools/flexbox-generator";
import { ToolBreadcrumb } from "@/components/layout/tool-breadcrumb";

export const metadata: Metadata = {
  title: "CSS Flexbox Generator - Dev Yantra",
  description:
    "Visually configure CSS Flexbox container properties with a live multi-item preview. Adjust direction, wrap, alignment, and gap, then copy the CSS.",
};

export default function FlexboxGeneratorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16">
      <ToolBreadcrumb toolSlug="flexbox-generator" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          CSS Flexbox Generator
        </h1>
        <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
          Configure the flex container properties, preview the layout live with
          sample items, and copy the generated CSS.
        </p>
      </div>
      <FlexboxGenerator />
    </div>
  );
}
