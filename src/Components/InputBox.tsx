import React from 'react'

export const InputBox = ( { type, placeholder }:{type:string, placeholder:string} ) => {
  return (
    <input type={type} placeholder={placeholder} className='max-w-96 border border-gray-300 rounded-md' />

  )
}
