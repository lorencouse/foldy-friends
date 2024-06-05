import React, { Dispatch, SetStateAction } from 'react';
import { useShopContext } from '../../context/ShopContext';
import { CartItem, ProductData } from '../../types';
import Link from 'next/link';
import { CartQuantityButtons } from '../Cart/CartQuantityButtons';

const MiniCart = ({ showMiniCart, setShowMiniCart }: { showMiniCart: boolean; setShowMiniCart: Dispatch<SetStateAction<boolean>>; }) => {
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
    return (
      <div className="cart-total mt-4">
        <p><span className='font-semibold'>Total: </span>{`$${total.toFixed(2)}`}</p>
      </div>
    );
  }

  return (
    <div
      className="cart-container flex flex-col lg:m-auto sm:mx-3 xs:mx-3 text-left items-end max-w-lg bg-white"
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-[auto_2fr_auto] lg:gap-12 gap-5 w-full"></div>
      <div className="overflow-y-auto max-h-96 w-full no-scrollbar">
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
      </div>
      <CartTotal />

    </div>
  );
};

const MiniCartItem = ({ product, cartItem }: { product: ProductData; cartItem: CartItem }) => {
  return (
    <div className='mini-cart-item'>
      <div className='grid grid-cols-[auto_2fr_auto] lg:gap-12 gap-5 m-auto py-8 w-full border border-y-1 border-x-0 border-gray-200'>
        <div className="cart-item">
          <Link href={`/product/${product.id}`}>
            <img src={`/Assets/product_${product.id}.png`} alt={product.name} className='max-h-24' />
          </Link>
        </div>
        <div className="cart-item flex items-center">
          <Link href={`/product/${product.id}`}>
            <p>{`${product.name} - `} <span className='font-semibold'>{`Size: ${cartItem.size.toUpperCase()}`}</span></p>
          </Link>
        </div>
        <div className="cart-item flex flex-col items-center justify-center">
          <p className='mt-4'>{`$${product.new_price.toFixed(2)}`}</p>
          <CartQuantityButtons cartItem={cartItem} />
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
