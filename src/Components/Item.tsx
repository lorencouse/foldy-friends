import React from 'react';
import { ProductData } from '../types';
import { Link } from 'react-router-dom';
import { Prices } from './Product/Prices';
import { useShopContext } from '../Context/ShopContext';
import { StarRating, StarRatingAverage } from './Product/StarRating';

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
                <StarRatingAverage id={props.id} />
                <Prices oldPrice={props.old_price} newPrice={props.new_price} />
            </div>
        </Link>
    );
};
