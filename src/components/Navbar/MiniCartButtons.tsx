import React from 'react'
import { useRouter } from 'next/router';
import { ButtonSquareRed } from '../BannerButton';


export const MiniCartButtons = ({setShowMiniCart}:{setShowMiniCart: (showMiniCart:boolean) => void;}) => {
    const router = useRouter();

    const handleNavigation = (url: string) => {
    router.push(url);
    setShowMiniCart(false);
    window.scrollTo(0, 0);
    
    
  };
    
  return (
    <div className="min-cart-buttons flex flex-row gap-x-4 justify-center items-center">
        
          <ButtonSquareRed label='Cart' onClick={() => handleNavigation('/cart')} />
     
          <ButtonSquareRed label='Checkout' onClick={() => handleNavigation('/cart')} />
       
    </div>
  )
}
