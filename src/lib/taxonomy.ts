export type Tool = {
  slug: string;
  name: string;
  description: string;
};

export type Subcategory = {
  slug: string;
  name: string;
  description: string;
  tools: Tool[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  subcategories: Subcategory[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "web-design",
    name: "Web & Design",
    description: "Tools for styling and designing web interfaces.",
    subcategories: [
      {
        slug: "css",
        name: "CSS",
        description: "Generate and preview CSS values visually.",
        tools: [
          {
            slug: "box-shadow-generator",
            name: "CSS Box Shadow Generator",
            description: "Build and copy box-shadow CSS with a live preview.",
          },
          {
            slug: "border-radius-generator",
            name: "CSS Border Radius Generator",
            description:
              "Build and copy border-radius CSS with a live preview.",
          },
          {
            slug: "gradient-generator",
            name: "CSS Gradient Generator",
            description:
              "Build and copy linear or radial gradient CSS with a live preview.",
          },
          {
            slug: "text-shadow-generator",
            name: "CSS Text Shadow Generator",
            description:
              "Build and copy text-shadow CSS with a live text preview.",
          },
          {
            slug: "filter-generator",
            name: "CSS Filter Generator",
            description:
              "Build and copy CSS filter effects with a live visual preview.",
          },
          {
            slug: "flexbox-generator",
            name: "CSS Flexbox Generator",
            description:
              "Visually configure Flexbox container properties with a live multi-item preview.",
          },
          {
            slug: "grid-generator",
            name: "CSS Grid Generator",
            description:
              "Visually configure Grid container properties with a live multi-item preview.",
          },
        ],
      },
    ],
  },
];

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategory(categorySlug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === categorySlug);
}

export function getSubcategory(
  categorySlug: string,
  subcategorySlug: string,
): Subcategory | undefined {
  const category = getCategory(categorySlug);
  return category?.subcategories.find(
    (subcategory) => subcategory.slug === subcategorySlug,
  );
}

export type ToolLocation = {
  category: Category;
  subcategory: Subcategory;
  tool: Tool;
};

export function findToolLocation(toolSlug: string): ToolLocation | undefined {
  for (const category of CATEGORIES) {
    for (const subcategory of category.subcategories) {
      const tool = subcategory.tools.find((t) => t.slug === toolSlug);
      if (tool) {
        return { category, subcategory, tool };
      }
    }
  }
  return undefined;
}
