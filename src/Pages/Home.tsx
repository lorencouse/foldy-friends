import React from 'react'
import { Hero } from '../Components/Home/Hero'
import { Collections } from '../Components/ProductCategory/Collections'
import { Offers } from '../Components/Home/Offers'
import womensTopSellers from '../Assets/data'
import newItems from '../Assets/new_collections'
import { Subscribe } from '../Components/Home/Subscribe'


export const Home = () => {
  return (
    <div className='flex flex-col justify-between' >
      <Hero />
      <div className='lg:mx-16 md:mx-12'>
      <Collections header='Womens Top Sellers' productData={womensTopSellers} />
      <Offers />
      <Collections header='New Items' productData={newItems} />
      <Subscribe />
      </div>


    </div>
    
  )
}
