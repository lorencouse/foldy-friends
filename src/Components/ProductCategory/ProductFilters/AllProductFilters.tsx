import React, { useState } from "react";
import { ProductData } from "../../types";
import {
  filterProductCategory,
  filterProductPrice,
} from "../../../tools/ProductFilterFunctions";
import PriceFiltersMinMax from "./PriceFilters";
import { SortProductsByDropdown } from "./SortProductsByDropdown";

const AllProductFilters = ({
  categories,
  products,
  filteredProducts,
  setFilteredProducts,
}: {
  categories: string[];
  products: ProductData[];
  filteredProducts: ProductData[];
  setFilteredProducts: (products: ProductData[]) => void;
}) => {
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    applyFilters(priceFilter, newCategory);
  };

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = Number(e.target.value);
    setPriceFilter((p) => {
      const newFilter = { ...p, min };
      applyFilters(newFilter, selectedCategory);
      return newFilter;
    });
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = Number(e.target.value);
    setPriceFilter((p) => {
      const newFilter = { ...p, max };
      applyFilters(newFilter, selectedCategory);
      return newFilter;
    });
  };

  const applyFilters = (
    priceFilter: { min: number; max: number },
    category: string,
  ) => {
    let filteredProducts = products;
    if (category !== "all") {
      filteredProducts = filterProductCategory(filteredProducts, category);
    }
    filteredProducts = filterProductPrice(
      filteredProducts,
      priceFilter.min,
      priceFilter.max,
    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="sort-by flex justify-center items-center gap-4">
      <p className="font-bold text-lg">Sort By:</p>
      <select
        name="categories"
        id="categories"
        onChange={handleCategoryChange}
        className="p-2 border rounded capitalize font-bold bg-gray-100"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
      <div className="price-filters flex flex-row items-center">
        <PriceFilter
          label="Price:"
          min={1}
          max={priceFilter.max - 1}
          value={priceFilter.min}
          onchange={handleMinPrice}
        />
        <PriceFilter
          label="- "
          min={priceFilter.min + 1}
          max={200}
          value={priceFilter.max}
          onchange={handleMaxPrice}
        />

        <SortProductsByDropdown
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
        />
      </div>
    </div>
  );
};

export default AllProductFilters;
