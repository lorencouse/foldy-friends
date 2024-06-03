import React from 'react';
import { ProductData } from '../../types';
import { Link } from 'react-router-dom';
import { Prices } from '../Product/Prices';
import { useShopContext } from '../../Context/ShopContext';
import { StarRatingAverage } from '../Product/StarRating';
import { ButtonRoundRed, ButtonSquareRed } from '../BannerButton';

export const Item: React.FC<ProductData> = (props) => {
    const { setActiveCategory } = useShopContext();

    return (
        <Link to={`/product/${props.id}`} >
            <div 
                className='transition ease-in-out hover:scale-105 pl-2 my-3 w-72 text-left m-auto' 
                onClick={() => setActiveCategory(props.category)} 
            >
                <img src={props.image} alt={props.name} />
                <p className='capitalize'>{props.name}</p>
                <div className='flex flex-row justify-between items-center '>
                    <div className="flex flex-col">
                        <StarRatingAverage id={props.id} />
                        <Prices oldPrice={props.old_price} newPrice={props.new_price} />
                        
                    </div>
                    <button className='h-8 w-8 mr-4 bg-red-600 hover:bg-red-400 text-white'>+</button>
                    

                </div>
                
            </div>
        </Link>
    );
};
