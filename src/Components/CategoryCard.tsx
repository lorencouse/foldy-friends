import React from 'react'
import { Link } from 'react-router-dom'
import { useShopContext } from '../Context/ShopContext'

export const CategoryCard = (props:{category: string}) => {

    const { setActiveCategory } = useShopContext()

  return (
    <div>
        <Link to={`/${props.category}`} >
            <div 
                className='transition ease-in-out hover:scale-105 pl-2 my-3 w-72 text-left m-auto' 
                onClick={() => setActiveCategory(props.category)} 
            >
                <img src={require(`../Assets/category_${props.category}.png`)} alt={`category ${props.category}`} />
                <p className='capitalize text-2xl text-center p-2'>{props.category}</p>
            </div>
        </Link>


    </div>
  )
}
