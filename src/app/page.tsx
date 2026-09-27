import Link from "next/link";
import { getCategories } from "@/lib/taxonomy";

export default function Home() {
  const categories = getCategories();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Developer tools that just work.
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Dev Yantra is a growing collection of fast, simple, browser-based
          utilities for everyday development tasks - no sign-up, no backend,
          just tools that do exactly what they say.
        </p>
      </section>

      <section className="mt-12 flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Categories</h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="flex flex-col gap-1 rounded-lg border border-black/[.08] p-4 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08] sm:max-w-sm sm:flex-1"
            >
              <span className="font-medium">{category.name}</span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {category.description}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
