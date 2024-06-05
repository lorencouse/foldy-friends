import React from 'react'
import { InputBox } from '../../InputBox'


const CreateProduct = () => {
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-6 ">
        <h1>Create New Product</h1>
          <div className="customer-information flex flex-col">
            <InputBox type='text' placeholder='Name' />
            <InputBox type='text' placeholder='Description' />
            <InputBox type='number' placeholder='Full Price' />
            <InputBox type='number' placeholder='Full Price' />
            <InputBox type='file' placeholder='Images' />
            <InputBox type='text' placeholder='State' />
            <InputBox type='text' placeholder='Zip Code' />
            <InputBox type='email' placeholder='Email' />
            <InputBox type='tel' placeholder='Phone Number' />

        </div>
    </div>
  )
}

export default CreateProduct;