import React from 'react'
import { Cart } from '../Components/Cart'
import { useShopContext } from '../Context/ShopContext'
import { ButtonRoundRed } from '../Components/BannerButton';
import { Collections } from '../Components/ProductCategory/Collections';
import { MiniCart } from '../Components/Navbar/MiniCart';

export const CartPage = () => {

    const { cartCount, allProducts } = useShopContext();

  return (
    <div className='cart-page-container max-w-7xl m-auto'>
        { cartCount > 0 && 
        <>
        <Cart />
        </>
        }

        { cartCount < 1 && 
        
        <div className=' m-8'>
        <h1>Looks like your cart is empty....</h1>
        <ButtonRoundRed label='Go to Shop' url='/' />
        
        </div>
        
        }

        <Collections productData={allProducts} header='You Might Be Interested In...' />


        
    </div>
  )
}
