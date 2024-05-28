import React from 'react'
import { Link } from 'react-router-dom'

export const Breadcrumbs = ( {category, name}:{category: string, name: string} ) => {
  return (
        <div className='breadcrimbs flex flex-row capitalize'> 
          <p> <Link to="/">Home </Link> / <Link to="/shop">Shop </Link> / <Link to={`/${category}`}>{category}</Link> / <span className='text-gray-400'>{name}</span></p>
        </div>
  )
}
