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



  return (
    <div className="lg:w-11/12 m-auto">
      <img src={require(`../../Assets/banner_${category}.png`)} alt={`${category} banner`} />
      <div className="sort-by flex flex-row flex-wrap justify-between items-center m-3 ">
        <p className='my-5'>
          <span className="font-extrabold">Showing 1-12</span> out of {filteredProducts.length} products
        </p>

        <div className='flex justify-end items-end w-full md:w-96'>
        <PriceFilters
          products={categoryProducts}
          setFilteredProducts={setFilteredProducts}
        />
        </div>
      </div>

      <Collections header={category} productData={filteredProducts} />
      <ButtonRoundBlack label="Load More" url="" />
    </div>
  );
};

