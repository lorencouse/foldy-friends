import React, {useState} from 'react'
import { ButtonSquareRed } from '../BannerButton';
import { useAddToCart } from '../../hooks/UseAddToCart';
import { addToCartSvg, checkSvg } from '../svgPaths';

export const AddToCartButton = ({id, size}:{id:number, size:string}) => {
  const handleAddToCart = useAddToCart();

  const [buttonText, setButtonText] = useState<string>("Add to Cart");
  const [svg, setSvg] = useState<string>(addToCartSvg)

  return (
    <ButtonSquareRed label={buttonText} d={svg} onClick={() => { handleAddToCart(id, size); setButtonText("Added"); setSvg(checkSvg); setTimeout( () =>  {setButtonText("Add to Cart"); setSvg(addToCartSvg) }, 1000 )}} />
  )
}
