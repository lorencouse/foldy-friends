import React, { useState } from "react";

import { ProductReview } from "../../../types";

const renderStars = (rating: number) => {
  const starIcon = "/assets/star_icon.png";
  const starIconGray = "/assets/star_dull_icon.png";
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <img key={i} src={starIcon} alt="Full Star" className="h-4 w-4" />,
    );
  }
  for (let i = rating; i < 5; i++) {
    stars.push(
      <img key={i} src={starIconGray} alt="Gray Star" className="h-4 w-4" />,
    );
  }
  return stars;
};

export const StarRating = (props: { rating: number }) => {
  return (
    <div className="rating flex flex-row items-center">
      <div className="flex flex-row w-22">{renderStars(props.rating)}</div>
    </div>
  );
};

export const CreateStarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  const [isRatingSelected, setIsRatingSelected] = useState(false);
  const [originalRating, setOriginalRating] = useState(0);
  const starIcon = "/assets/star_icon.png";
  const starIconGray = "/assets/star_dull_icon.png";

  const handleMouseOver = (index: number) => {
    setIsRatingSelected(false);
    setRating(index);
  };

  const handleMouseOut = () => {
    setRating(isRatingSelected ? rating : originalRating);
  };

  const handleClick = (index: number) => {
    setRating(index);
    setOriginalRating(index);
    setIsRatingSelected(true);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <img
        key={i}
        src={i <= rating ? starIcon : starIconGray}
        alt={i <= rating ? "Full Star" : "Gray Star"}
        className="h-4 w-4 cursor-pointer"
        onMouseOver={() => handleMouseOver(i)}
        onMouseOut={handleMouseOut}
        onClick={() => handleClick(i)}
      />,
    );
  }

  return (
    <div className="rating flex flex-row items-center m-4">
      <p className="font-bold">Rating: </p>
      <div className="flex flex-row w-22 mx-3">{stars}</div>
    </div>
  );
};

export const StarRatingAverage = (props: { id: string }) => {


  const reviews: ProductReview[] = [];

  let totalRatings = 0;
  let reviewCount = reviews.length;

  if (reviews) {
    reviews.forEach((review) => {
      totalRatings += review.rating;
    });
  }

  const averageRating = reviewCount > 0 ? totalRatings / reviewCount : 0;

  return (
    <div className="rating flex flex-row items-center">
      <div className="flex flex-row w-22">
        {renderStars(Math.round(averageRating))}
      </div>
      <p className="review-count mx-1">{`(${reviewCount})`}</p>
    </div>
  );
};
