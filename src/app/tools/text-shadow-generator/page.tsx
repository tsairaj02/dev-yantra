import type { Metadata } from "next";
import { TextShadowGenerator } from "@/components/tools/text-shadow-generator";
import { ToolBreadcrumb } from "@/components/layout/tool-breadcrumb";

export const metadata: Metadata = {
  title: "CSS Text Shadow Generator - Dev Yantra",
  description:
    "Generate CSS text-shadow values visually with a live preview. Adjust offset, blur, color, and opacity, then copy the CSS.",
};

export default function TextShadowGeneratorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16">
      <ToolBreadcrumb toolSlug="text-shadow-generator" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          CSS Text Shadow Generator
        </h1>
        <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
          Adjust the controls to build a text-shadow, preview it live, and copy
          the generated CSS.
        </p>
      </div>
      <TextShadowGenerator />
    </div>
  );
}
