import type { Metadata } from "next";
import { BoxShadowGenerator } from "@/components/tools/box-shadow-generator";

export const metadata: Metadata = {
  title: "CSS Box Shadow Generator — Dev Yantra",
  description:
    "Generate CSS box-shadow values visually with a live preview. Adjust offset, blur, spread, color, and opacity, then copy the CSS.",
};

export default function BoxShadowGeneratorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          CSS Box Shadow Generator
        </h1>
        <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
          Adjust the controls to build a box-shadow, preview it live, and copy
          the generated CSS.
        </p>
      </div>
      <BoxShadowGenerator />
    </div>
  );
}
