export const emptyProduct = {
  id: "",
  name: "",
  description: "",
  full_price: "",
  sale_price: "",
  images: [],
  colors: [],
  category: '',
  tags: [],
  reviews: [],
  created_at: new Date(),
  updated_at: new Date(),
  sold_to_date: 0,
  stock: 0,
  sku: "",
};

export const productVariations = ["Red", "Blue", "Purple", "Green", "Yellow", "Black", "White"];
export const productCategories = [
  "Paper",
  "Accessories",
  "Crafting Supplies",
  "Kits",
  "Books"
];
export const productTags = [
  "Supplies",
  "Scissors",
  "Knives and Blades",
  "Animals",
  "Pens",
  "Markers",
  "Staples",
];