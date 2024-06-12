import React, { useState } from 'react'
import { CheckoutInfo } from '../components/Checkout/CheckoutInfo';
import { ButtonSquareRed } from '../components/BannerButton';
import MiniCart from '../components/Navbar/MiniCart';
import { useShopContext } from '../context/ShopContext';
import { EmptyCart } from '../components/Cart/EmptyCart';
import { Collections } from '../components/ProductCategory/Collections';
import { lockSvg } from '../components/svgPaths';



const Checkout = () => {

  const [ billing, setBilling] = useState<boolean>(false);
  const { cartCount, allProducts } = useShopContext();



  return (
    <div className="checkout-container max-w-5xl m-auto "> 
    { cartCount > 0 ? ( 
    <div className='flex flex-row flex-wrap md:grid md:grid-cols-2 justify-around '>
        <div className="checkout-left-col flex flex-col">
          <CheckoutInfo heading="Shipping Info" />
          <div className="billing-checkbox flex items-center font-semibold ml-2" onClick={() => setBilling( !billing)}>
            <input type="checkbox" checked={billing}   />
            <label >Seperate Billing Info</label>
          </div>

        </div>
        <div className="checkout-right-col flex flex-col justify-around">
          
          { billing && 
          <div className='w-full mb-10'>
          <CheckoutInfo heading='Billing Info' />
          </div>
          }
          
          
           
          <MiniCart showMiniCart={true} setShowMiniCart={() => {}} />

          <div className="flex place-order-button w-full items-center justify-end ">
            <ButtonSquareRed d={lockSvg} label='Place Order' onClick={() => {}} />
          </div>
        </div>

   
    </div>
    ) : (
      <div className='empty-cart'>
        <EmptyCart />
          <Collections productData={allProducts} header='You Might Be Interested In...' />
      </div>
      
      

    )

    }

    
    
    </div>
 
  )
}

export default Checkout;
