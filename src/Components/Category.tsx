import React, { useContext } from 'react'
import { Collections } from './Collections'
import { ShopContext } from '../Context/ShopContext'
import { ButtonRoundBlack } from './BannerButton';

export const Category = ( {category}:{category:string}) => {

  const shopContext = useContext(ShopContext);

  if (!shopContext) {
    return <div>Loading...</div>;
  }

  const { allProducts } = shopContext;

  const filtered = allProducts.filter(i => i.category === category)


  return (
    <div className='lg:w-11/12 m-auto'>
        <img src={require(`../Assets/banner_${category}.png`)} alt={`${category} banner`} />
        <div className="sort-by flex flex-row justify-between items-center ">
            <p><span className='font-extrabold'>Showing 1-12</span> out of {filtered.length} products</p>
                <button className='rounded-full w-32 text-black p-3 bg-white hover:bg-gray-500 outline outline-1 outline-gray-400 my-10' >Sort By</button>
        </div>
        <Collections header={category} productData={filtered} />
        <ButtonRoundBlack label='Load More' url='' />
    </div>
  )
}
