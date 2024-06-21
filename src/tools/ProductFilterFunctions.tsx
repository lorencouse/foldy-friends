import { ProductData } from "../types";

export const shuffleProducts = (array: ProductData[], number: number) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, number);
};

export function filterProductCategory(
  products: ProductData[],
  category: string,
) {
  return products.filter((p) => p.category === category);
}

export function filterProductTag(
  products: ProductData[],
  tag: string,
) {
  return products.filter((p) => p.tags.includes(tag));
}

export function filterProductPrice(
  products: ProductData[],
  min: number,
  max: number,
) {
  return products.filter((p) => {
    const price = p.sale_price ?? p.full_price ?? 0;
    return price >= min && price <= max;
  });
}
