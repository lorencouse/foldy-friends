import React from 'react'
import Link from 'next/link';
import { useShopContext } from '../../context/ShopContext'

export const CategoryCard = (props:{category: string}) => {

    const { setActiveCategory } = useShopContext()

  return (
    <div>
        <Link href={`/category/${props.category}`} >
            <div 
                className='transition ease-in-out hover:scale-105 pl-2 my-3 w-72 text-left m-auto' 
                onClick={() => setActiveCategory(props.category)} 
            >
                <img src={`/assets/categories/${props.category}.jpg`} alt={`category ${props.category}`} />
                <p className='capitalize text-2xl text-center p-2'>{props.category}</p>
            </div>
        </Link>


    </div>
  )
}
