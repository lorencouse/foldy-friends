import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Collections } from './Components/ProductCategory/Collections';
import { useShopContext } from './Context/ShopContext';
import { ButtonRoundBlack } from './Components/BannerButton';
import { PriceFilters, SortBy } from './Components/ProductCategory/ProductFilters';
import { ProductData } from './types';
import { filterProductCategory } from './Tools/ShuffleProducts';

const Category = () => {
  const router = useRouter();
  const { category } = router.query;
  const { allProducts } = useShopContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    if (category && allProducts.length > 0) {
      const categoryProducts = filterProductCategory(allProducts, category as string);
      setFilteredProducts(categoryProducts);
    }
  }, [category, allProducts]);

  if (!category) return null;

  return (
    <div className="lg:w-11/12 m-auto">
      <Image 
        src={`/Assets/banner_${category}.png`} 
        alt={`${category} banner`} 
        width={1200} // Set appropriate width and height
        height={400} 
      />
      <div className="sort-by flex flex-row flex-wrap justify-between items-center m-3 ">
        <p className='my-5'>
          <span className="font-extrabold">Showing 1-12</span> out of {filteredProducts.length} products
        </p>

        <div className='flex justify-end items-end w-full md:w-96'>
          <PriceFilters
            products={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />
          <SortBy filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} />
        </div>
      </div>

      <Collections header={category as string} productData={filteredProducts} />
      <ButtonRoundBlack label="Load More" url="" />
    </div>
  );
};

export default Category;