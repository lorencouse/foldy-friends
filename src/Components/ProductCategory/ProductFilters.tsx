import React from 'react'
import { ProductData } from '../../types';
import { filterProductCategory, filterProductPrice } from '../../Tools/ShuffleProducts';
import { useState, useEffect } from 'react';
import { useShopContext } from '../../Context/ShopContext';
// import { Category } from '../../Pages/Category';



interface PriceFiltersProps {
  products: ProductData[];
  setFilteredProducts: (products: ProductData[]) => void;
}

export const PriceFilters: React.FC<PriceFiltersProps> = ({
  products,
  setFilteredProducts,
}) => {

  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 0, max: 100 });
  const { activeCategory } = useShopContext();

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter(p => ({ ...p, min: Number(e.target.value) }));
    setFilteredProducts(filterProductPrice(products, Number(e.target.value), priceFilter.max));
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter(p => ({ ...p, max: Number(e.target.value) }));
    setFilteredProducts(filterProductPrice(products, priceFilter.min, Number(e.target.value)));
  };


  useEffect(() => {
    setFilteredProducts(filterProductCategory( products, activeCategory));
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

const PriceFilter = (props: {
  label: string;
  min: number;
  max: number;
  value: number;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex items-center">
      <p className="font-bold text-lg mx-4">{props.label}</p>
      <div className="relative">
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold">$</span>
        <input
          className="w-20 h-10 p-2 pl-6 border rounded capitalize font-bold bg-gray-100"
          placeholder="Min Price"
          min={props.min}
          max={props.max}
          type="number"
          value={props.value}
          onChange={props.onchange}
        />
      </div>
    </div>
  );
};

export const AllProductFilters = (props: { categories: string[], products: ProductData[],   filteredProducts: ProductData[], setFilteredProducts: (products: ProductData[]) => void }) => {
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 0, max: 100 });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    applyFilters(priceFilter, newCategory);
  };

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceFilter(p => {
      const newFilter = { ...p, min: value };
      applyFilters(newFilter, selectedCategory);
      return newFilter;
    });
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceFilter(p => {
      const newFilter = { ...p, max: value };
      applyFilters(newFilter, selectedCategory);
      return newFilter;
    });
  };

const handleSortPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const sort = e.target.value;
  let sortedProducts = [...props.filteredProducts]; 

  if (sort === "low") {
    sortedProducts = sortedProducts.sort((p1, p2) => (p1.new_price > p2.new_price) ? 1 : (p1.new_price < p2.new_price) ? -1 : 0);
  } else if (sort === "high") {
    sortedProducts = sortedProducts.sort((p1, p2) => (p1.new_price < p2.new_price) ? 1 : (p1.new_price > p2.new_price) ? -1 : 0);
  } else {
   
    applyFilters(priceFilter, selectedCategory);
    return; 
  }

  props.setFilteredProducts(sortedProducts);
};

  const applyFilters = (priceFilter: { min: number; max: number }, category: string) => {
    let filteredProducts = props.products;
    if (category !== 'all') {
      filteredProducts = filterProductCategory(filteredProducts, category);
    }
    filteredProducts = filterProductPrice(filteredProducts, priceFilter.min, priceFilter.max);
    props.setFilteredProducts(filteredProducts);
  };

  return (
    <div className="sort-by flex justify-center items-center gap-4">
      <p className='font-bold text-lg'>Sort By:</p>
      <select name="categories" id="categories" onChange={handleCategoryChange} className="p-2 border rounded capitalize font-bold bg-gray-100">
        <option value="all">Category</option>
        {props.categories.map(category => (
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
        <select name="sort-price" id="sort-price" onChange={handleSortPrice} className="mx-6 p-2 border rounded capitalize font-bold bg-gray-100">
          <option value="none">Sort Price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

      </div>
      
    </div>
  );
};