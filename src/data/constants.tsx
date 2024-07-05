export const emptyProduct: ProductInfo = {
  id: "",
  name: "",
  description: "",
  full_price: 0,
  sale_price: 0,
  images: [],
  variations: [],
  category: "",
  tags: [],
  reviews: [],
  created_at: new Date(),
  updated_at: new Date(),
  sold_to_date: 0,
  stock: 0,
  sku: "",
};

export const productVariations = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Pink",
  "Black",
  "White",
];
export const productCategories = [
  "paper",
  "tools",
  "kits",
  // "crafting supplies",
  // "books",
];
export const productTags = [
  "supplies",
  "scissors",
  "glue",
  "tape",
  "knives and blades",
  "animals",
  "masks",
  "models",
  "pens",
  "markers",
  "staples",
];
