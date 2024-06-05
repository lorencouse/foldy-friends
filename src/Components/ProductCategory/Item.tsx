import React, { useState } from 'react';
import { ProductData } from '../../types';
import Link from 'next/link';
import { Prices } from '../Product/Prices';
import { useShopContext } from '../../context/ShopContext';
import { StarRatingAverage } from '../Product/Reviews/StarRating';
import { useAddToCart } from '../../hooks/UseAddToCart';



export const Item: React.FC<ProductData> = (props) => {
    const { setActiveCategory } = useShopContext();
    const handleAddToCart = useAddToCart();
    const [buttonText, setButtonText] = useState<string>("+")

    return (
        
            <div 
                className='transition ease-in-out hover:scale-105 pl-2 my-3 w-72 text-left m-auto' 
                onClick={() => setActiveCategory(props.category)} 
            >
                <Link href={`/product/${props.id}`} >
                <img src={`/Assets/product_${props.id}.png`} alt={props.name} />
                <p className='capitalize'>{props.name}</p>
                </Link>
                <div className='flex flex-row justify-between items-center '>
                    <div className="flex flex-col">
                        <StarRatingAverage id={props.id} />
                        <Prices oldPrice={props.old_price} newPrice={props.new_price} />
                        
                    </div>
                    <button className='h-8 min-w-8 mr-4 bg-red-600 hover:bg-red-400 text-white px-3' onClick={() =>{ handleAddToCart(props.id, "m"); setButtonText("✓ Added"); setTimeout( () => setButtonText("+"), 1000 )  }} >{buttonText}</button>
                    

                </div>
                
            </div>
        
    );
};
