import React from 'react'
import { Hero } from '../components/Home/Hero'
import { Collections } from '../components/ProductCategory/Collections'
import { Offers } from '../components/Home/Offers'
import womensTopSellers from '../data/data'
import newItems from '../data/new_collections'
import { Subscribe } from '../components/Home/Subscribe'
import { useShopContext } from '../context/ShopContext'
import { filterProductTag, sortProducts } from '../tools/ProductFilterFunctions'


const Home = () => {
  const {allProducts} = useShopContext();
  const newProducts = sortProducts(allProducts, "newest").slice(0, 8);
  const modelProducts = filterProductTag(allProducts, "models").slice(0, 4);

  return (
    <div className='flex flex-col justify-between' >
      <Hero />
      <div className='lg:mx-16 md:mx-12'>
      <Collections header='Top Selling Paper Models' productData={modelProducts} />
      <Offers />
      <Collections header='New Items' productData={newProducts} />
      <Subscribe />
      </div>


    </div>
    
  )
};

export default Home;
