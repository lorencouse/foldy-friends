import React, {useState} from 'react'
import { ButtonSquareRed } from '../BannerButton';
import { useAddToCart } from '../../hooks/UseAddToCart';

export const AddToCartButton = ({id, size}:{id:number, size:string}) => {
    const handleAddToCart = useAddToCart();
  const [buttonText, setButtonText] = useState<string>("Add to Cart")

  return (
    <ButtonSquareRed label={buttonText} onClick={() => { handleAddToCart(id, size); setButtonText("✓ Added"); setTimeout( () => setButtonText("Add to Cart"), 1000 )}} />

  )
}
