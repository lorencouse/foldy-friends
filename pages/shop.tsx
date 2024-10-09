import React from 'react';
import Shop from '../src/pages/Shop'
import { ProductInfo } from '../src/types';
import { shuffleProducts, filterProductCategory } from '../src/tools/ProductFilterFunctions';
import { productCategories as categories } from "../src/data/constants";
import { getAllProducts } from '../src/lib/api';

export async function getStaticProps() {
  const products = await getAllProducts();

  const topSellers = categories.map((category) => ({
    category,
    products: shuffleProducts(filterProductCategory(products, category), 4),
  }));

  return {
    props: {
      products,
      topSellers,
    },
  };
}

const ShopPage = ( { products, topSellers }: { products: ProductInfo[], topSellers: {category: string, products: ProductInfo[]}[]} ) => {

  return (
    <Shop products={products} topSellers={topSellers} />
  )
}

export default ShopPage;

