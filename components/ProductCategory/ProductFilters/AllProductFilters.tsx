"use client";

import React, { useEffect, useState, useMemo } from "react";
import PriceFiltersMinMax from "./PriceFilters";
import SortProductsByDropdown from "./SortProductsByDropdown";
import {
  filterProductPrice,
  sortProducts,
  filterProductCategory,
  filterProductTag,
} from "@/tools/ProductFilterFunctions";
import { Product } from "@/types";

const AllProductFilters = ({
  allProducts,
  setFilteredProducts,
  isCategory,
  category,
}: {
  allProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  isCategory?: boolean;
  category?: string;
}) => {
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 60,
  });
  const [sort, setSort] = useState<string>("");

  const filteredProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];

    let products = allProducts;
    if (category && category !== "all-products") {
      if (isCategory) {
        products = filterProductCategory(products, category);
      } else {
        products = filterProductTag(products, category);
      }
    }
    products = filterProductPrice(products, priceRange.min, priceRange.max);
    products = sortProducts(products, sort);
    return products;
  }, [allProducts, category, isCategory, priceRange, sort]);

  useEffect(() => {
    setFilteredProducts(filteredProducts);
  }, [filteredProducts, setFilteredProducts]);

  return (
    <div className="price-filters flex flex-row flex-wrap justify-center items-center">
      <PriceFiltersMinMax
        setPriceRange={setPriceRange}
        priceRange={priceRange}
      />
      <SortProductsByDropdown setSort={setSort} sort={sort} />
    </div>
  );
};

export default AllProductFilters;
