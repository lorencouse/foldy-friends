import React from 'react'
import Link from 'next/link'

export const Breadcrumbs = ( {category, name}:{category: string, name: string} ) => {
  return (
        <div className='breadcrimbs flex flex-row capitalize'> 
          <p> <Link href="/">Home </Link> / <Link href="/shop">Shop </Link> / <Link href={`/category/${category}`}>{category}</Link> / <span className='text-gray-400'>{name}</span></p>
        </div>
  )
}
