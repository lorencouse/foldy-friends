import React from 'react'
import { InputBox } from '../InputBox'


export const CheckoutInfo = ( {heading}:{heading:string}) => {
  return (
    <div className='mx-2'>
        <h3>{heading}</h3>
          <div className="customer-information flex flex-col w-full">
            <InputBox type='text' placeholder='Name' />
            <InputBox type='text' placeholder='Adress' />
            <InputBox type='text' placeholder='City' />
            <InputBox type='text' placeholder='State' />
            <InputBox type='text' placeholder='Zip Code' />
            <InputBox type='email' placeholder='Email' />
            <InputBox type='tel' placeholder='Phone Number' />

        </div>
    </div>
  )
}
