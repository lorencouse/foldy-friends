import React from 'react'

export const TextInput = ( {type, placeholder}:{type: string, placeholder: string} ) => {
  return (
        <input type={type} placeholder={placeholder} className='p-3 my-3 outline outline-1 outline-gray-300 '/>
  )
}
