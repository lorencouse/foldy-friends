import { ProductInfo } from "../types";

// Shuffles products array and returns a specified number of products
export const shuffleProducts = (array: ProductInfo[], number: number) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, number);
};

// Filters products by category
export function filterProductCategory(
  products: ProductInfo[],
  category: string,
) {
  return products.filter((p) => p.category === category);
}

// Filters products by tag
export function filterProductTag(products: ProductInfo[], tag: string) {
  return products.filter((p) => p.tags.includes(tag));
}

// Filters products by price range
export function filterProductPrice(
  products: ProductInfo[],
  min: number,
  max: number,
) {
  return products.filter((p) => {
    const price = p.sale_price ?? p.full_price ?? 0;
    return price >= min && price <= max;
  });
}

// Sorts products based on specified criteria
export function sortProducts(
  products: ProductInfo[],
  sort: string,
): ProductInfo[] {
  const sortedProducts = [...products];

  switch (sort) {
    case "lowest":
      return sortedProducts.sort(
        (p1, p2) =>
          (p1.sale_price ?? p1.full_price ?? 0) -
          (p2.sale_price ?? p2.full_price ?? 0),
      );
    case "highest":
      return sortedProducts.sort(
        (p1, p2) =>
          (p2.sale_price ?? p2.full_price ?? 0) -
          (p1.sale_price ?? p1.full_price ?? 0),
      );
    case "newest":
      return sortedProducts.sort(
        (p1, p2) => (p2.created_at ?? 0) - (p1.created_at ?? 0),
      );
    case "oldest":
      return sortedProducts.sort(
        (p1, p2) => (p1.created_at ?? 0) - (p2.created_at ?? 0),
      );
    default:
      return products;
  }
}
