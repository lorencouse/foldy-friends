import React, { useState } from 'react'
import { ButtonSquareRed } from '../../BannerButton'
import { CreateStarRating } from './StarRating'
import { InputBox } from '../InputBox'
import { ProductReview } from '../../../types'

export const WriteReviewBox = ( {productId}:{productId:number} ) => {

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState<ProductReview>(null)
  
  async function createReview() {
    
    const reviewDetails:ProductReview = {
      id: 1,
      created_at: Date(),
      product_id: productId,
      user_id: 0,
      title: "",
      content: "",
      rating:rating,
    };

    const res = await fetch('/api/reviews', {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({reviewDetails}),
    });

    const data = await res.json();
    setReview(data);
  } 


  return (
    <div>
        <h3>Leave a Review:</h3>
        <div className="title-stars flex flex-row flex-wrap items-baseline  ">
        <input type="text" placeholder='Title...' className='w-96 border border-gray-300 rounded-md mb-8 p-2' />
        {/* <InputBox type='text' placeholder='Title...' /> */}
        <CreateStarRating rating={rating} setRating={setRating} />
        </div>
        <input type="text" placeholder='Review content...' className='w-full min-h-72 border border-gray-300 rounded-md p-2' />
        <ButtonSquareRed label='Submit' onclick={createReview} />
    </div>
  )
}
