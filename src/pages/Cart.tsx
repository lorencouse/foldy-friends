import React from 'react';
import { CartFullSize } from '../components/CartFullSize';
import { useShopContext } from '../context/ShopContext';
import { ButtonRoundRed } from '../components/BannerButton';
import { Collections } from '../components/ProductCategory/Collections';


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
