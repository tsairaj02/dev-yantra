import { describe, expect, it } from "vitest";
import {
  findToolLocation,
  getCategories,
  getCategory,
  getSubcategory,
} from "./taxonomy";

describe("getCategories", () => {
  it("returns the seeded categories", () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0].slug).toBe("web-design");
  });
});

describe("getCategory", () => {
  it("finds a category by slug", () => {
    expect(getCategory("web-design")?.name).toBe("Web & Design");
  });

  it("returns undefined for an unknown category", () => {
    expect(getCategory("does-not-exist")).toBeUndefined();
  });
});

describe("getSubcategory", () => {
  it("finds a subcategory within a category", () => {
    expect(getSubcategory("web-design", "css")?.name).toBe("CSS");
  });

  it("returns undefined for an unknown subcategory", () => {
    expect(getSubcategory("web-design", "does-not-exist")).toBeUndefined();
  });

  it("returns undefined for an unknown category", () => {
    expect(getSubcategory("does-not-exist", "css")).toBeUndefined();
  });
});

describe("findToolLocation", () => {
  it("finds the category and subcategory for a known tool", () => {
    const location = findToolLocation("box-shadow-generator");
    expect(location?.category.slug).toBe("web-design");
    expect(location?.subcategory.slug).toBe("css");
    expect(location?.tool.name).toBe("CSS Box Shadow Generator");
  });

  it("returns undefined for an unknown tool", () => {
    expect(findToolLocation("does-not-exist")).toBeUndefined();
  });
});
