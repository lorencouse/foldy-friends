import React, {useState} from 'react'
import { ButtonSquareRed } from '../BannerButton';
import { useAddToCart } from '../../hooks/UseAddToCart';
import { AddToCartSvg, CheckSvg } from '../svgPaths';

export const AddToCartButton = ({id, size}:{id:number, size:string}) => {
  const handleAddToCart = useAddToCart();

  const [buttonText, setButtonText] = useState<string>("Add to Cart");
  const [svg, setSvg] = useState<string>(AddToCartSvg)

  return (
    <ButtonSquareRed label={buttonText} icon={svg} onClick={() => { handleAddToCart(id, size); setButtonText("Added"); setSvg(CheckSvg); setTimeout( () =>  {setButtonText("Add to Cart"); setSvg(AddToCartSvg) }, 1000 )}} />
  )
}
