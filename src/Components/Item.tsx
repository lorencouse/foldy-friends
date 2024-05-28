import React from 'react'
import { ProductData } from '../types'
import { Link } from 'react-router-dom'
import { Prices } from './Product/Prices'

export const Item = ( props:ProductData ) => {
  return (
    <Link to={`/product/${props.id}`} >
    <div className='transition ease-in-out hover:scale-105 pl-2 my-3 w-72 text-left m-auto'>
        <img src={props.image} alt={props.name} className='' />
        <p className=' capitalize font-medium ' > {props.name} </p>
        <Prices oldPrice={props.old_price} newPrice={props.new_price} />
    </div>
    </Link>
  )
}