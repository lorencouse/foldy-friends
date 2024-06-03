import React, { Dispatch, SetStateAction } from 'react'
import { useShopContext } from '../../Context/ShopContext';
import { CartItem, ProductData } from '../../types';
import { Link } from 'react-router-dom';
import { ButtonSquareRed} from '../BannerButton';
import { CartQuantityButtons} from '../Cart';


export const MiniCart = ( {showMiniCart, setShowMiniCart}:{showMiniCart:boolean, setShowMiniCart:Dispatch<SetStateAction<boolean>> } ) => {

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
    <div className="cart-container flex flex-col lg:m-auto sm:mx-3 xs: mx-3  text-left items-end max-w-96 bg-white z-20">
      <div className="grid grid-cols-[auto_2fr_auto] lg:gap-12 gap-5 py-10 w-full  "> 

        <div className="cart-labels">
          <p>Image</p>
        </div>
        <div className="cart-labels">
          <p>Name</p>
        </div>
        <div className="cart-labels">
          <p>Price</p>
        </div>

      </div>
                  {cartItems.map((cartItem) => {
              const product = productMap[cartItem.id];

              return product ? ( 
                <MiniCartItem 
                  key={cartItem.id} 
                  product={product} 
                  cartItem={cartItem} 
                />
              ) : null;
            })}

      <CartTotal />
      <div className="min-cart-buttons flex flex-row gap-x-4 justify-center items-center ">
        <Link to="/cart"><ButtonSquareRed label='Cart' onclick={ () => { setShowMiniCart(false); window.scrollTo(0, 0) }} /></Link>
        <ButtonSquareRed label='Checkout' onclick={ () =>{ setShowMiniCart(false); window.scrollTo(0, 0)}} /></div>
          
      
</div>

  )
}


const MiniCartItem = ( {product, cartItem}:{product:ProductData, cartItem:CartItem } ) => {


    
  return (
        <div className='mini-cart-item'>
        <div className='grid grid-cols-[auto_2fr_auto] lg:gap-12 gap-5 m-auto py-8 w-full border border-y-1 border-x-0 border-gray-200  '>
        <div className="cart-item ">
            <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} className='max-h-24'/> </Link>
        </div>
        <div className="cart-item flex items-center">
        <Link to={`/product/${product.id}`}> <p>{`${product.name} - `} <span className='font-semibold'>{`Size: ${cartItem.size.toUpperCase()}`}</span> </p></Link>
        </div>
        <div className="cart-item flex flex-col items-center justify-center">
           
            <p className='mt-4'>{`$${product.new_price.toFixed(2)}`}</p>
            <CartQuantityButtons cartItem={cartItem} />
            
        </div>

        </div>
    </div>
  )
}

