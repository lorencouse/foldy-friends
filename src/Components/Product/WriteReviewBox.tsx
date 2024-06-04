import React from 'react'
import { ButtonSquareRed } from '../BannerButton'
import { CreateStarRating } from './StarRating'
import { InputBox } from '../InputBox'

export const WriteReviewBox = () => {
  return (
    <div>
        <h3>Leave a Review:</h3>
        <div className="title-stars flex flex-row flex-wrap items-baseline  ">
        {/* <input type="text" placeholder='Title...' className='w-96 border border-gray-300 rounded-md mb-8 p-2' /> */}
        <InputBox type='text' placeholder='Title...' />
        <CreateStarRating />
        </div>
        <input type="text" placeholder='Review content...' className='w-full min-h-72 border border-gray-300 rounded-md p-2' />
        <ButtonSquareRed label='Submit' onclick={() => {}} />
    </div>
  )
}
