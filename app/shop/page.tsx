import React from "react";
import Shop from "./Shop";
import {
  shuffleProducts,
  filterProductCategory,
} from "@/tools/ProductFilterFunctions";
import { productCategories as categories } from "@/data/constants";
import { getAllProducts } from "@/lib/api";
import { Product } from "@/types";

const ShopPage = async () => {
  const products: Product[] = await getAllProducts();

  const topSellers: Product[] = categories.map((category) => ({
    category,
    products: shuffleProducts(filterProductCategory(products, category), 4),
  }));

  return <Shop products={products} topSellers={topSellers} />;
};

export default ShopPage;
