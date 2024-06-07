import React, { useState, useEffect } from 'react';
import { ProductData } from '../../types';
import { filterProductCategory, filterProductPrice } from '../../tools/ShuffleProducts';
import { useShopContext } from '../../context/ShopContext';

interface PriceFiltersProps {
  products: ProductData[];
  setFilteredProducts: (products: ProductData[]) => void;
}

const PriceFilter = ({ label, min, max, value, onchange }: {
  label: string;
  min: number;
  max: number;
  value: number;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex items-center">
    <p className="font-bold text-lg mx-4">{label}</p>
    <div className="relative">
      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold">$</span>
      <input
        className="w-20 h-10 p-2 pl-6 border rounded capitalize font-bold bg-gray-100"
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={onchange}
      />
    </div>
  </div>
);

const PriceFilters: React.FC<PriceFiltersProps> = ({ products, setFilteredProducts }) => {
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 0, max: 100 });
  const { activeCategory } = useShopContext();

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = Number(e.target.value);
    setPriceFilter(p => ({ ...p, min }));
    setFilteredProducts(filterProductPrice(products, min, priceFilter.max));
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = Number(e.target.value);
    setPriceFilter(p => ({ ...p, max }));
    setFilteredProducts(filterProductPrice(products, priceFilter.min, max));
  };

  useEffect(() => {
    setFilteredProducts(filterProductCategory(products, activeCategory));
    setPriceFilter({ min: 0, max: 130 });
  }, [activeCategory]);

  return (
    <div className="price-filters flex flex-row items-center">
      <PriceFilter label="Price:" min={1} max={priceFilter.max - 1} value={priceFilter.min} onchange={handleMinPrice} />
      <PriceFilter label="- " min={priceFilter.min + 1} max={200} value={priceFilter.max} onchange={handleMaxPrice} />
    </div>
  );
};

const AllProductFilters = ({ categories, products, filteredProducts, setFilteredProducts }: {
  categories: string[];
  products: ProductData[];
  filteredProducts: ProductData[];
  setFilteredProducts: (products: ProductData[]) => void;
}) => {
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 0, max: 100 });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    applyFilters(priceFilter, newCategory);
  };

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = Number(e.target.value);
    setPriceFilter(p => {
      const newFilter = { ...p, min };
      applyFilters(newFilter, selectedCategory);
      return newFilter;
    });
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = Number(e.target.value);
    setPriceFilter(p => {
      const newFilter = { ...p, max };
      applyFilters(newFilter, selectedCategory);
      return newFilter;
    });
  };

  const applyFilters = (priceFilter: { min: number; max: number }, category: string) => {
    let filteredProducts = products;
    if (category !== 'all') {
      filteredProducts = filterProductCategory(filteredProducts, category);
    }
    filteredProducts = filterProductPrice(filteredProducts, priceFilter.min, priceFilter.max);
    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="sort-by flex justify-center items-center gap-4">
      <p className='font-bold text-lg'>Sort By:</p>
      <select name="categories" id="categories" onChange={handleCategoryChange} className="p-2 border rounded capitalize font-bold bg-gray-100">
        <option value="all">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
      <div className="price-filters flex flex-row items-center">
        <PriceFilter label="Price:" min={1} max={priceFilter.max - 1} value={priceFilter.min} onchange={handleMinPrice} />
        <PriceFilter label="- " min={priceFilter.min + 1} max={200} value={priceFilter.max} onchange={handleMaxPrice} />

        <SortBy filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} />
      </div>
    </div>
  );
};



export const SortBy = ( { filteredProducts, setFilteredProducts}:{  filteredProducts: ProductData[],
  setFilteredProducts: (products: ProductData[]) => void}) => {

    const handleSortPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    let sortedProducts = [...filteredProducts];

    if (sort === "low") {
      sortedProducts.sort((p1, p2) => ( p1.new_price ?? p1.old_price ?? 0 ) - ( p2.new_price ?? p2.old_price ?? 0 ));
    } else if (sort === "high") {
      sortedProducts.sort((p1, p2) => ( p2.new_price ?? p2.old_price ?? 0 ) - ( p1.new_price ?? p1.old_price ?? 0 ));
    } else {
      // applyFilters(priceFilter, selectedCategory);
      return;
    }

    setFilteredProducts(sortedProducts);
  };


  return (
        <select name="sort-price" id="sort-price" onChange={handleSortPrice} className="mx-6 p-2 border rounded capitalize font-bold bg-gray-100">
          <option value="">Sort Price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
  )
}


export { PriceFilters, AllProductFilters };
