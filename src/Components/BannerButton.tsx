import React from 'react'

export const BannerButtonRed = (props:{label: string, url: string}) => {
  return (
    <button className='rounded-full w-48 bg-red-600 p-3 text-white hover:bg-red-500 my-10' >{props.label}</button>
  )
}

export const BannerButtonBlack = (props:{label: string, url: string}) => {
  return (
    <button className='rounded-full w-48 bg-black p-3 text-white hover:bg-gray-500 my-10' >{props.label}</button>
  )
}
