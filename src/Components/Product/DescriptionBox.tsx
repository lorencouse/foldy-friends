import React, { useState } from 'react'
import { ReviewsBox } from './ReviewsBox';
import { ReviewData } from '../../types';

export const DescriptionBox = ( props:{description:string, id:number, reviews:ReviewData[]} ) => {
    const [descriptionBox, setDescriptionBox] = useState<boolean>(true);

  return (
    <div className=''>
        <div className="description-box-buttons flex flex-row items-start">
            <button onClick={() => setDescriptionBox(true)} className={`p-3 ${descriptionBox ? "bg-gray-50 font-semibold" : "bg-white"}  outline outline-1 outline-gray-400 w-32 `}>Description</button>
            <button onClick={() => setDescriptionBox(false)} className={`p-3 ${!descriptionBox ? "bg-gray-50 font-semibold" : "bg-white"}  outline outline-1 outline-gray-400 w-32 `}>Reviews</button>
        </div>

        
        <div className="description-text-box p-10 outline outline-1 outline-gray-400 text-left">
            
                {descriptionBox ? props.description : <ReviewsBox reviews={props.reviews} id={ props.id } /> }
            
        </div> 






    </div>
  )
}
