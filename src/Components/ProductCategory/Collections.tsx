import React from 'react'
import { Item } from './Item'
import { ProductData } from '../../types'

export const Collections = ( props:{header: string, productData:ProductData[] } ) => {
  return (
    <div className='uppercase my-10' >
        <h2>{props.header}</h2>
        <hr className='w-56 h-1 my-5 m-auto bg-black  '/>
        <div className="popular-items flex flex-row justify-around items-center flex-wrap  ">
            { props.productData.map( (product, key) => {
                return (
                <Item key={key} id={product.id} name={product.name} category={product.category} image={product.image} old_price={product.old_price} new_price={product.new_price} />
                )
            } ) }
        </div>
    </div>
  )
}
