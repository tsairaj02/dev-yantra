import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getCategory } from "@/lib/taxonomy";

export function generateStaticParams() {
  return getCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    return { title: "Category not found - Dev Yantra" };
  }

  return {
    title: `${category.name} Tools - Dev Yantra`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16">
      <nav
        aria-label="Breadcrumb"
        className="text-sm text-zinc-600 dark:text-zinc-400"
      >
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{category.name}</span>
      </nav>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          {category.name}
        </h1>
        <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
          {category.description}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {category.subcategories.map((subcategory) => (
          <Link
            key={subcategory.slug}
            href={`/categories/${category.slug}/${subcategory.slug}`}
            className="flex flex-col gap-1 rounded-lg border border-black/[.08] p-4 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08] sm:max-w-sm sm:flex-1"
          >
            <span className="font-medium">{subcategory.name}</span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {subcategory.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
