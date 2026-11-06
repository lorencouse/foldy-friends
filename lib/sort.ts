export const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "newest", label: "Newest" },
] as const;

export type Sort = (typeof SORTS)[number]["value"];

export function parseSort(raw: string | string[] | undefined): Sort {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return SORTS.find((s) => s.value === v)?.value ?? "featured";
}
