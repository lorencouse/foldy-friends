import React from 'react'
import Link from 'next/link';
import { useShopContext } from '../../context/ShopContext'

export const CategoryCard = (props:{category: string}) => {

    const { setActiveCategory } = useShopContext()

  return (
    <div className="transition duration-200 ease-in-out hover:scale-105 shadow-lg my-3 md:mx-1 mx-0 w-auto text-left rounded-2xl">
      <Link href={`/category/${props.category}`}>
        <div onClick={() => setActiveCategory(props.category)}>
          <img
            src={`/assets/categories/${props.category}.jpg`}
            alt={`category ${props.category}`}
            className="rounded-t-2xl"
          />
        </div>
        <div className="bg-neutral rounded-b-2xl">
          <p className="capitalize text-2xl text-center p-3 text-white ">
            {props.category}
          </p>
        </div>
      </Link>
    </div>
  );
}
