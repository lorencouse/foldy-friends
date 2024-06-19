import React from 'react'
import { Hero } from '../components/Home/Hero'
import { Collections } from '../components/ProductCategory/Collections'
import { Offers } from '../components/Home/Offers'
import womensTopSellers from '../data/data'
import newItems from '../data/new_collections'
import { Subscribe } from '../components/Home/Subscribe'
import { useShopContext } from '../context/ShopContext'


const Home = () => {
  const {allProducts} = useShopContext()
  return (
    <div className='flex flex-col justify-between' >
      <Hero />
      <div className='lg:mx-16 md:mx-12'>
      <Collections header='Womens Top Sellers' productData={allProducts} />
      <Offers />
      <Collections header='New Items' productData={allProducts} />
      <Subscribe />
      </div>


    </div>
    
  )
};

export default Home;
