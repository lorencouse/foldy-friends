import React from 'react'
import { CartItem, ProductData } from '../types'
import { useShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom';
import { ButtonInput, ButtonSquareRed } from './BannerButton';


export const Cart = () => {

    const { allProducts, cartItems } = useShopContext();

    const productMap = allProducts.reduce((map, product) => {
      map[product.id] = product;
      return map;
    }, {} as { [id: number]: ProductData });

  function CartTotal() {
      let total = 0;

      cartItems.forEach(cartItem => {
        total += productMap[cartItem.id].new_price * cartItem.quantity;
      });

      return <div className="cart-total mt-4 "  ><p> <span className='font-semibold'>Total: </span> {`$${total.toFixed(2)}`}</p></div> 
  };



  return (
    <div className="cart-container flex flex-col lg:m-auto sm:mx-3 xs: mx-3  max-w-4xl text-left items-end ">
      <div className="grid grid-cols-[auto_2fr_auto_auto_auto] lg:gap-12 gap-5 py-10 w-full  "> 

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

      <CartTotal />
          
      <ButtonSquareRed label='Checkout' onclick={ () => {  }} />
</div>
  )
}

const CartLineItem = ( {product, cartItem}:{product:ProductData, cartItem:CartItem } ) => {



  return (
    <div className='grid grid-cols-[auto_2fr_auto_auto_auto] lg:gap-12 gap-5 m-auto py-8 w-full border border-y-1 border-x-0 border-gray-200  '>
      <div className="cart-item ">
        <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} className='max-h-24'/> </Link>
      </div>
      <div className="cart-item flex items-center">
       <Link to={`/product/${product.id}`}> <p>{`${product.name} - `} <span className='font-semibold'>{`Size: ${cartItem.size.toUpperCase()}`}</span> </p></Link>
      </div>
      <div className="cart-item flex items-center">
        <p>{`$${product.new_price.toFixed(2)}`}</p>
      </div>
      <CartQuantityButtons cartItem={cartItem} />
      <div className="cart-item flex items-center m-auto">
        <RemoveItemButton cartItem={cartItem} />
      </div>
    </div>
  )
}



export const RemoveItemButton = ({cartItem}:{cartItem:CartItem}) => {
  const { setCartItems, setCartCount } = useShopContext();

  function removeCartItem() {
      if (cartItem.quantity > 1) {
        setCartCount( oldCount => oldCount - cartItem.quantity );
      }
      setCartItems( oldCartItems => oldCartItems.filter( item => item !== cartItem) )

  }
  return (
    <ButtonInput onclick={removeCartItem} label='X' />
  )
}



export const CartQuantityButtons = ({cartItem}:{cartItem:CartItem}) => {

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
      <div className="cart-item flex flex-row items-center ">

        <ButtonInput onclick={decrementQuantity} label='-' />

        <p className="w-6 h-6 text-center m-3 outline outline-1 rounded-lg font-semibold ">{cartItem.quantity}</p>

        <ButtonInput onclick={incrementQuantity}  label='+' />
        
      </div>
  )
}


