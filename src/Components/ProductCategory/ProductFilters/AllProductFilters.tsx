import React, { useEffect, useState } from "react";
import PriceFiltersMinMax from "./PriceFilters";
import SortProductsByDropdown from "./SortProductsByDropdown";
import {
  filterProductPrice,
  sortProducts,
  filterProductCategory,
  filterProductTag
} from "../../../tools/ProductFilterFunctions";
import { ProductData } from "../../../types";
import Category from "../../../pages/Category";

const AllProductFilters = ({
  allProducts,
  setFilteredProducts,
  isCategory,
  category
}: {
  allProducts: ProductData[];
  setFilteredProducts: (products: ProductData[]) => void;
  isCategory?: boolean;
  category?: string;
}) => {
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });
  const [sort, setSort] = useState<string>("");

  useEffect(() => {

    if (allProducts.length === 0) return;
    

    let products = allProducts;

    if (category !== "all-products") {
      if (isCategory) {
        products = filterProductCategory(products, category);
      } else {
        products = filterProductTag(products, category);
      }
    }

    products = filterProductPrice(products, priceRange.min, priceRange.max);
    products = sortProducts(products, sort);

    setFilteredProducts(products);
  }, [allProducts, priceRange, sort, category, setFilteredProducts]);

  return (
    <div className="price-filters flex flex-row flex-wrap justify-center items-center">
      <PriceFiltersMinMax setPriceRange={setPriceRange} priceRange={priceRange} />
      <SortProductsByDropdown setSort={setSort} sort={sort} />
    </div>
  );
};

export default AllProductFilters;
