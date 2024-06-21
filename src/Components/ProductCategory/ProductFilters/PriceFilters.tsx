import React, { useState, useEffect } from "react";
import { ProductData } from "../../types";
import {
  filterProductCategory,
  filterProductPrice,
} from "../../../tools/ProductFilterFunctions";
import { useShopContext } from "../../../context/ShopContext";

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

const PriceFiltersMinMax = ({
  products,
  setFilteredProducts,
}: {
  products: ProductData[];
  setFilteredProducts: (products: ProductData[]) => void;
}) => {
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({
    min: 0,
    max: 200,
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
  }, [activeCategory, products, setFilteredProducts]);

  return (
    <div className="price-filters flex flex-row items-center">
        <p>Price:</p>
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

export default PriceFiltersMinMax;
