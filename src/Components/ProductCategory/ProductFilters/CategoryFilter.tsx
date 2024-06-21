import React, { useState, useEffect } from "react";
import { useShopContext } from "../context/ShopContext";
import PriceFiltersMinMax from "../components/ProductCategory/ProductFilters/PriceFiltersMinMax";
import SortProductsByDropdown from "../components/ProductCategory/ProductFilters/SortProductsByDropdown";
import { ProductData } from "../types";
import {
  filterProductCategory,
  filterProductPrice,
  sortProducts,
} from "../tools/ProductFilterFunctions";
import { Collections } from "../components/ProductCategory/Collections";
import { ButtonRoundBlack } from "../components/BannerButton";

const CategoryFilter = ({
  category,
  isCategory,
}: {
  category: string;
  isCategory: boolean;
}) => {
  const { allProducts } = useShopContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: Infinity,
  });
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    if (!category || allProducts.length === 0) return;

    let products = allProducts;

    if (isCategory) {
      products = filterProductCategory(products, category);
    }

    products = filterProductPrice(products, priceRange.min, priceRange.max);
    products = sortProducts(products, sort);

    setFilteredProducts(products);
  }, [category, isCategory, allProducts, priceRange, sort]);

  return (
    <div className="lg:w-11/12 m-auto">
      <div className="sort-by flex flex-row flex-wrap justify-between items-center m-3">
        <p className="my-5">
          <span className="font-extrabold">Showing 1-12</span> out of{" "}
          {filteredProducts.length} products
        </p>
        <div className="flex justify-end items-end w-full md:w-96">
          <PriceFiltersMinMax setPriceRange={setPriceRange} />
          <SortProductsByDropdown setSort={setSort} />
        </div>
      </div>
      <Collections header={category} productData={filteredProducts} />
      <ButtonRoundBlack label="Load More" url="" />
    </div>
  );
};

export default CategoryFilter;
