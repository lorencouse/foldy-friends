import React from 'react';
import Home from '../src/pages/Home';
import { getAllProducts } from '../src/lib/api';
import { sortProducts, filterProductTag } from '../src/tools/ProductFilterFunctions';


const HomePage = ( { newProducts, modelProducts }: { newProducts: ProductInfo[], modelProducts: ProductInfo[] } ) => {
  return <Home newProducts={newProducts} modelProducts={modelProducts}/>;
};

export default HomePage;

export async function getStaticProps() {
  const products = await getAllProducts();
  const newProducts = sortProducts(products, "newest").slice(0, 8);
  const modelProducts = filterProductTag(products, "models").slice(0, 4);

  return {
    props: {
      newProducts,
      modelProducts,
    },
  };
}