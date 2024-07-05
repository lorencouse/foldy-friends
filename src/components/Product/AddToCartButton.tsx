import React, {useState} from 'react'
import { ButtonSquareRed } from '../BannerButton';
import { useAddToCart } from '../../hooks/UseAddToCart';
import { AddToCartSvg, CheckSvg } from '../svgPaths';
import { useShopContext } from '../../context/ShopContext';

export const AddToCartButton = ({id, size}:{id:number, size:string}) => {
  const handleAddToCart = useAddToCart();
  const { setShowMiniCart } = useShopContext();
  const [buttonText, setButtonText] = useState<string>("Add to Cart");
  const [svg, setSvg] = useState<React.ReactNode>(AddToCartSvg)

  const handleClick = () => {
    handleAddToCart(id, size);

    setButtonText("Added");
    setSvg(CheckSvg);
    setTimeout( () =>  {setShowMiniCart(true)}, 200 )
    setTimeout( () =>  {setButtonText("Add to Cart"); setSvg(AddToCartSvg) }, 1000 )
    
    window.scrollTo(0, 0);
  }

  return (
    <ButtonSquareRed label={buttonText} icon={svg} onClick={() => handleClick()} />
  )
}
