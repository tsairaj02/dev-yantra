import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getCategories, getSubcategory } from "@/lib/taxonomy";

export function generateStaticParams() {
  return getCategories().flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: category.slug,
      subcategory: subcategory.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const subcategory = getSubcategory(categorySlug, subcategorySlug);

  if (!subcategory) {
    return { title: "Category not found - Dev Yantra" };
  }

  return {
    title: `${subcategory.name} Tools - Dev Yantra`,
    description: subcategory.description,
  };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = getCategory(categorySlug);
  const subcategory = getSubcategory(categorySlug, subcategorySlug);

  if (!category || !subcategory) {
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
        <Link href={`/categories/${category.slug}`} className="hover:underline">
          {category.name}
        </Link>
        <span className="mx-2">/</span>
        <span>{subcategory.name}</span>
      </nav>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          {subcategory.name}
        </h1>
        <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
          {subcategory.description}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {subcategory.tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="flex flex-col gap-1 rounded-lg border border-black/[.08] p-4 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08] sm:max-w-sm sm:flex-1"
          >
            <span className="font-medium">{tool.name}</span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {tool.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
