// src/Components/.tsx
import React from 'react';
import { CartItem, ProductData } from '../../types';
import { useShopContext } from '../../context/ShopContext';
import Link from 'next/link';
import { ButtonInput, ButtonSquareRed } from '../BannerButton';
import { CartQuantityButtons } from '../Cart/CartQuantityButtons';
import { EmptyCart } from './EmptyCart';

export const CartFullSize = () => {
  const { allProducts, cartItems } = useShopContext();

  const productMap = allProducts.reduce((map, product) => {
    map[product.id] = product;
    return map;
  }, {} as { [id: number]: ProductData });

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  function CartTotal() {
    let total = 0;

    cartItems.forEach(cartItem => {
      const product = productMap[cartItem.id];
      if (product) {
        const price = product.new_price ?? product.new_price ?? 0;
        total += price * cartItem.quantity;
      }
    });

    return (
      <div className="cart-total mt-4">
        <p><span className='font-semibold'>Total: </span>{`$${total.toFixed(2)}`}</p>
      </div>
    );
  }

  return (
    <div className="cart-container flex flex-col lg:m-auto sm:mx-3 xs: mx-3 max-w-4xl text-left">
      <h1>Cart</h1>
      <div className="grid grid-cols-[auto_auto_2fr_auto] lg:gap-12 gap-5 w-full text-center"></div>
      {cartItems.map((cartItem) => {
        const product = productMap[cartItem.id];
        return product ? (
          <CartLineItem key={cartItem.id} product={product} cartItem={cartItem} />
        ) : null;
      })}
      <div className="flex justify-end">
        <CartTotal />
      </div>
      
      <div className='flex justify-end '>
        <Link href="/checkout">
          <ButtonSquareRed label='Checkout' onClick={() => window.scrollTo(0, 0)} />
        </Link>
      </div>
    </div>
  );
};

const CartLineItem = ({ product, cartItem }: { product: ProductData; cartItem: CartItem }) => {
  const price = product.new_price ?? product.old_price ?? 1000;
  return (
    <div className='grid grid-cols-[auto_auto_2fr_auto] lg:gap-12 gap-5 m-auto py-8 w-full border border-y-1 border-x-0 border-gray-200'>
      <div className="cart-item flex items-center justify-center">
        <RemoveItemButton cartItem={cartItem} />
      </div>
      <div className="cart-item">
        <Link href={`/product/${product.id}`}>
          <img src={`/Assets/product_${product.id}.png`} alt={product.name} className='max-h-24' />
        </Link>
      </div>
      <div className="cart-item flex flex-col items-start justify-center">
        <Link href={`/product/${product.id}`}>
          <p className='pb-2'>{`${product.name} - `} <span className='font-semibold'>{`Size: ${cartItem.size.toUpperCase()}`}</span></p>
        </Link>
      </div>
      <div className="cart-item flex flex-col items-center">
        <p>{`$${price.toFixed(2)}`}</p>
        <CartQuantityButtons cartItem={cartItem} />
      </div>
    </div>
  );
};

const RemoveItemButton = ({ cartItem }: { cartItem: CartItem }) => {
  const { setCartItems, setCartCount } = useShopContext();

  function removeCartItem() {
    setCartCount(oldCount => oldCount - cartItem.quantity);
    setCartItems(oldCartItems => oldCartItems.filter(item => item !== cartItem));
  }

  return (
    <ButtonInput onClick={removeCartItem} label='X' />
  );
};
