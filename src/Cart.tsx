import React from 'react';
import { CartFullSize } from '../src/Components/CartFullSize';
import { useShopContext } from '../src/Context/ShopContext';
import { ButtonRoundRed } from '../src/Components/BannerButton';
import { Collections } from '../src/Components/ProductCategory/Collections';
import MiniCart from './Components/Navbar/MiniCart';

const Cart = () => {
  const { cartCount, allProducts } = useShopContext();

  return (
    <div className='cart-page-container max-w-7xl m-auto'>
      {cartCount > 0 ? (
        <>
          <CartFullSize />
         
        </>
      ) : (
        <div className='m-8'>
          <h2>Looks like your cart is empty....</h2>
          <ButtonRoundRed label='Go to Shop' url='/' />
        </div>
      )}
      <Collections productData={allProducts} header='You Might Be Interested In...' />
    </div>
  );
};

export default Cart;
