import React from 'react'

export const Cart = () => {
  return (
    <div className='flex flex-col justify-around m-10 '>
      <div className="cart-labels flex flex-row">
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Remove</p>
      </div>

      <div className="cart-item flex flex-row">
        <img src="" alt="" />
        <p>Shirt</p>
        <p>$10.00</p>
        <input type="number" name="" id="" />
        <button>X</button>
      </div>

    </div>
  )
}
