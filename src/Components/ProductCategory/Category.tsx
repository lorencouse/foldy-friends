import React, { useEffect, useState } from 'react';
import { Collections } from '../ProductCategory/Collections';
import { useShopContext } from '../../Context/ShopContext';
import { ButtonRoundBlack } from '../BannerButton';
import { PriceFilters } from './ProductFilters';
import { ProductData } from '../../types';
import { filterProductCategory } from '../../Tools/ShuffleProducts';

export const Category = ({ category }: { category: string }) => {
  const { allProducts } = useShopContext();
  const categoryProducts = filterProductCategory(allProducts, category);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>(categoryProducts);
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 0, max: 110 });

  useEffect(() => {
    setFilteredProducts(categoryProducts);
    setPriceFilter({ min: 0, max: 110 }); // Reset price filters
  }, [category]);

  return (
    <div className="lg:w-11/12 m-auto">
      <img src={require(`../../Assets/banner_${category}.png`)} alt={`${category} banner`} />
      <div className="sort-by flex flex-row justify-between items-center">
        <p>
          <span className="font-extrabold">Showing 1-12</span> out of {filteredProducts.length} products
        </p>
        <button className="rounded-full w-32 text-black p-3 bg-white hover:bg-gray-500 outline outline-1 outline-gray-400 my-10">
          Sort By
        </button>
      </div>
      <PriceFilters
        products={categoryProducts}
        setFilteredProducts={setFilteredProducts}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />
      <Collections header={category} productData={filteredProducts} />
      <ButtonRoundBlack label="Load More" url="" />
    </div>
  );
};

