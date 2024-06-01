import React from 'react'
import { ProductData } from '../../types';
import { filterProductCategory, filterProductPrice } from '../../Tools/ShuffleProducts';
import { useState } from 'react';



interface PriceFiltersProps {
  products: ProductData[];
  setFilteredProducts: (products: ProductData[]) => void;
  priceFilter: { min: number; max: number };
  setPriceFilter: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
}

export const PriceFilters: React.FC<PriceFiltersProps> = ({
  products,
  setFilteredProducts,
  priceFilter,
  setPriceFilter,
}) => {
  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceFilter(p => ({ ...p, min: Number(value) }));
    setFilteredProducts(filterProductPrice(products, Number(value), priceFilter.max));
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceFilter(p => ({ ...p, max: Number(value) }));
    setFilteredProducts(filterProductPrice(products, priceFilter.min, Number(value)));
  };

  return (
    <div className="price-filters flex flex-row items-center">
      <PriceFilter
        label="Min"
        min={1}
        max={priceFilter.max - 1}
        value={priceFilter.min}
        onchange={handleMinPrice}
      />
      <PriceFilter
        label="Max"
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


export const CategoryFilter = ( props:{ categories:string[], products:ProductData[], setFilteredProducts:(products:ProductData[]) => void } ) => {

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        if (selectedCategory === "all") {
            props.setFilteredProducts(props.products);
        } else {
            props.setFilteredProducts(filterProductCategory(props.products, selectedCategory));
        }
    };

    return (
                    <select name="categories" id="categories" onChange={handleCategoryChange} className="p-2 border rounded capitalize font-bold bg-gray-100">
                        <option value="all">Category</option>
                        {props.categories.map(category => (
                            <option key={category} value={category} >
                                {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
    )
}
