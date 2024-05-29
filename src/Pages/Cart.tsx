import React, { useContext } from 'react'
import { CartItem, ProductData } from '../types'
import { useShopContext } from '../Context/ShopContext'

const CartLineItem = ( {product, cartItem}:{product:ProductData, cartItem:CartItem } ) => {


  return (
    <>
      <div className="cart-item">
        <img src={product.image} alt={product.name} className='h-24'/> 
      </div>
      <div className="cart-item">
        <p>{`${product.name} - Size: ${cartItem.size.toUpperCase()}`}</p>
      </div>
      <div className="cart-item">
        <p>{`$${product.new_price}`}</p>
      </div>
      <div className="cart-item">
        <input type="number" name="quanitity" id="" value={cartItem.quantity} />
      </div>
      <div className="cart-item">
        <button>X</button>
      </div>
    </>
  )
}

export const Cart = () => {

    const { allProducts, cartItems, setCartItems } = useShopContext();

    const productMap = allProducts.reduce((map, product) => {
      map[product.id] = product;
      return map;
    }, {} as { [id: number]: ProductData });


  return (
<div className="grid grid-cols-5 gap-4"> 

  <div className="cart-labels">
    <p>Image</p>
  </div>
  <div className="cart-labels">
    <p>Name</p>
  </div>
  <div className="cart-labels">
    <p>Price</p>
  </div>
  <div className="cart-labels">
    <p>Quantity</p>
  </div>
  <div className="cart-labels">
    <p>Remove</p>
  </div>

      {cartItems.map((cartItem) => {
        const product = productMap[cartItem.id];

        return product ? ( 
          <CartLineItem 
            key={cartItem.id} 
            product={product} 
            cartItem={cartItem} 
          />
        ) : null;
      })}

</div>
  )
}
