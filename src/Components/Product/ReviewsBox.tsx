import React from 'react'
import { StarRating } from './StarRating'
import { ReviewData } from '../../types'

export const ReviewsBox = ( props:{reviews:ReviewData[], id:number} ) => {



  return (
    <div className='review-box flex flex-col' >

      <h3>Reviews {`(${props.reviews.length})`}</h3>

      {props.reviews.map(review => <ReviewLine title={review.title} content={review.content} rating={review.rating} /> )}

      

    </div>
  )
}

const ReviewLine = ( props:{title: string, content:string, rating:number}) => {


  return (
    <div className="review-line border border-y-1 border-x-0 p-5 ">
      <div className="title-rating flex flex-row">
        <p className="title font-bold mr-4 my-3">{props.title}</p>
        <StarRating rating={props.rating} />

      </div>

      <p className="review-content">
        {props.content}
      </p>
    </div>
  )

}
