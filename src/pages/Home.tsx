import React from 'react'
import { Hero } from '../components/Home/Hero'
import { Collections } from '../components/ProductCategory/Collections'
import { Offers } from '../components/Home/Offers'
import womensTopSellers from '../data/data'
import newItems from '../data/new_collections'
import { Subscribe } from '../components/Home/Subscribe'


const Home = () => {
  return (
    <div className='flex flex-col justify-between' >
      <Hero />
      <div className='lg:mx-16 md:mx-12'>
      {/* <Collections header='Womens Top Sellers' productData={womensTopSellers} /> */}
      <Offers />
      {/* <Collections header='New Items' productData={newItems} /> */}
      <Subscribe />
      </div>


    </div>
    
  )
};

export default Home;
