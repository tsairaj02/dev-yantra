import Link from "next/link";
import { findToolLocation } from "@/lib/taxonomy";

export function ToolBreadcrumb({ toolSlug }: { toolSlug: string }) {
  const location = findToolLocation(toolSlug);

  if (!location) {
    return null;
  }

  const { category, subcategory } = location;
  const subcategoryHref = `/categories/${category.slug}/${subcategory.slug}`;

  return (
    <div className="flex flex-col gap-3">
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
        <Link href={subcategoryHref} className="hover:underline">
          {subcategory.name}
        </Link>
      </nav>
      <Link
        href={subcategoryHref}
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-400"
      >
        ← Back to {subcategory.name} Tools
      </Link>
    </div>
  );
}
