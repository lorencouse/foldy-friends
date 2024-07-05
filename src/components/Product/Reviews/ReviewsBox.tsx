import React from "react";
import { StarRating } from "./StarRating";
import { ProductReview } from "../../../types";
import { WriteReviewBox } from "./WriteReviewBox";

export const ReviewsBox = (props: { id: string }) => {
  // const reviews: ProductReview[] = reviewData.filter(
  //   (review) => review.id === props.id,
  // );

  const reviews: ProductReview[] = [];

  return (
    <div className="review-box flex flex-col">
      <h3>Reviews {`(${reviews.length})`}</h3>

      {reviews.map((review) => (
        <ReviewLine
          title={review.title}
          content={review.content}
          rating={review.rating}
        />
      ))}

      <WriteReviewBox productId={props.id} />
    </div>
  );
};

const ReviewLine = (props: {
  title: string;
  content: string;
  rating: number;
}) => {
  return (
    <div className="review-line border border-y-1 border-x-0 p-5 ">
      <div className="title-rating flex flex-row">
        <p className="title font-bold mr-4 my-3">{props.title}</p>
        <StarRating rating={props.rating} />
      </div>

      <p className="review-content">{props.content}</p>
    </div>
  );
};
