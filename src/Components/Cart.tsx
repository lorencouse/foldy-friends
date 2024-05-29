import React, { useContext } from 'react'
import { CartItem, ProductData } from '../types'
import { useShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom';
import { ButtonInput } from './BannerButton';


export const Cart = () => {

    const { allProducts, cartItems } = useShopContext();

    const productMap = allProducts.reduce((map, product) => {
      map[product.id] = product;
      return map;
    }, {} as { [id: number]: ProductData });

  return (
    <div className="cart-container">
      <div className="grid grid-cols-[auto_2fr_auto_auto_auto] lg:gap-12 gap-5 m-auto py-10 text-left max-w-4xl"> 

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
</div>
  )
}

const CartLineItem = ( {product, cartItem}:{product:ProductData, cartItem:CartItem } ) => {

  const { setCartItems, setCartCount } = useShopContext();


  function removeCartItem() {
      if (cartItem.quantity > 1) {
        setCartCount( oldCount => oldCount - cartItem.quantity );
      }
      setCartItems( oldCartItems => oldCartItems.filter( item => item !== cartItem) )

  }


    function incrementQuantity() {
    setCartItems((oldCartItems) =>
      oldCartItems.map((item) =>
        item.id === cartItem.id && item.size === cartItem.size ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

      setCartCount( oldCount => oldCount + 1 );
  }

  function decrementQuantity() {
    if (cartItem.quantity > 1) {
      setCartItems((oldCartItems) =>
        oldCartItems.map((item) =>
          item.id === cartItem.id && item.size === cartItem.size ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      removeCartItem();
    }
      setCartCount( oldCount => oldCount - 1 );
  }

  return (
    <>
      <div className="cart-item ">
        <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} className='max-h-24'/> </Link>
      </div>
      <div className="cart-item flex items-center">
       <Link to={`/product/${product.id}`}> <p>{`${product.name} - `} <span className='font-semibold'>{`Size: ${cartItem.size.toUpperCase()}`}</span> </p></Link>
      </div>
      <div className="cart-item flex items-center">
        <p>{`$${product.new_price}`}</p>
      </div>
      <div className="cart-item flex flex-row items-center ">

        <ButtonInput onclick={decrementQuantity} label='-' />

        <p className="w-6 h-6 text-center m-3 outline outline-1 rounded-lg font-bold ">{cartItem.quantity}</p>

        <ButtonInput onclick={incrementQuantity}  label='+' />
        
      </div>
      <div className="cart-item flex items-center m-auto">
        <ButtonInput onclick={removeCartItem} label='X' />
      </div>
    </>
  )
}
