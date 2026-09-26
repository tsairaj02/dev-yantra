import type { Metadata } from "next";
import { BorderRadiusGenerator } from "@/components/tools/border-radius-generator";

export const metadata: Metadata = {
  title: "CSS Border Radius Generator — Dev Yantra",
  description:
    "Generate CSS border-radius values visually with a live preview. Link or adjust individual corners, then copy the CSS.",
};

export default function BorderRadiusGeneratorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          CSS Border Radius Generator
        </h1>
        <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
          Adjust the corners to build a border-radius, preview it live, and copy
          the generated CSS.
        </p>
      </div>
      <BorderRadiusGenerator />
    </div>
  );
}
