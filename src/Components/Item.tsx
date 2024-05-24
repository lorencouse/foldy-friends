import React from 'react'
import { ProductData } from '../types'

export const Item = ( props:ProductData ) => {
  return (
    <div className='transition ease-in-out hover:scale-105 p-3 w-80 text-left m-auto'>
        <img src={props.image} alt={props.name} className=' ' />
        <p> {props.name} </p>
        <div className="prices flex flex-row my-3">
            <div className="sale-price font-bold">
                {`$${props.new_price}`}
            </div>
            <div className="retail-price mx-3 font-extralight line-through">
                 {`$${props.old_price}`}
            </div>
        </div>
    </div>
  )
}
