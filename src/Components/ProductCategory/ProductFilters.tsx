import React, { useState, useEffect } from "react";
import { ProductData } from "../../types";
import {
  filterProductCategory,
  filterProductPrice,
} from "../../tools/ShuffleProducts";
import { useShopContext } from "../../context/ShopContext";

interface PriceFiltersProps {
  products: ProductData[];
  setFilteredProducts: (products: ProductData[]) => void;
}

const PriceFilter = ({
  label,
  min,
  max,
  value,
  onchange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex items-center text-lg">
    <p className="font-bold ">{label}</p>
    <div className="relative">
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 font-bold">
        $
      </span>
      <input
        // className="w-20 h-10 p-2 pl-6 border rounded capitalize font-bold bg-gray-100"
        className="input input-bordered text-end px-3"
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={onchange}
      />
    </div>
  </div>
);

const PriceFilters: React.FC<PriceFiltersProps> = ({
  products,
  setFilteredProducts,
}) => {
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });
  const { activeCategory } = useShopContext();

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = Number(e.target.value);
    setPriceFilter((p) => ({ ...p, min }));
    setFilteredProducts(filterProductPrice(products, min, priceFilter.max));
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = Number(e.target.value);
    setPriceFilter((p) => ({ ...p, max }));
    setFilteredProducts(filterProductPrice(products, priceFilter.min, max));
  };

  useEffect(() => {
    setFilteredProducts(filterProductCategory(products, activeCategory));
    setPriceFilter({ min: 0, max: 130 });
  }, [activeCategory]);

  return (
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
    </div>
  );
};

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

        <SortBy
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
        />
      </div>
    </div>
  );
};

export const SortBy = ({
  filteredProducts,
  setFilteredProducts,
}: {
  filteredProducts: ProductData[];
  setFilteredProducts: (products: ProductData[]) => void;
}) => {
  const handleSortPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    let sortedProducts = [...filteredProducts];

    if (sort === "low") {
      sortedProducts.sort(
        (p1, p2) =>
          (p1.sale_price ?? p1.full_price ?? 0) -
          (p2.sale_price ?? p2.full_price ?? 0),
      );
    } else if (sort === "high") {
      sortedProducts.sort(
        (p1, p2) =>
          (p2.sale_price ?? p2.full_price ?? 0) -
          (p1.sale_price ?? p1.full_price ?? 0),
      );
    } else {
      // applyFilters(priceFilter, selectedCategory);
      return;
    }

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className=" dropdown dropdown-hover  mx-6">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 capitalize font-bold bg-gray-100"
      >
        Sort Price
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            className="capitalize font-bold"
            onClick={() => handleSortPrice({ target: { value: "low" } })}
          >
            Price: Low to High
          </button>
        </li>
        <li>
          <button
            className="capitalize font-bold"
            onClick={() => handleSortPrice({ target: { value: "high" } })}
          >
            Price: High to Low
          </button>
        </li>
      </ul>
    </div>
  );
};

export { PriceFilters, AllProductFilters };
