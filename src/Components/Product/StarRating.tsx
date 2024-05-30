import React from 'react'
import starIcon from "../../Assets/star_icon.png"
import starIconGray from "../../Assets/star_dull_icon.png"
import { ReviewData } from '../../types';
import { reviewData } from '../../Assets/reviewData';



const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<img key={i} src={starIcon} alt="Full Star" className='h-4 w-4' />);
    }
    for (let i = rating; i < 5; i++) {
        stars.push(<img key={i} src={starIconGray} alt="Gray Star" className='h-4 w-4' />);
    }
    return stars;
};

// export const StarRatingCount = (props: { reviews: ReviewData[] }) => {
//     let totalRatings = 0;
//     let reviewCount = props.reviews.length;

//     if (props.reviews) {
//         props.reviews.forEach(review => {
//             totalRatings += review.rating;
//         });
//     }

//     const averageRating = reviewCount > 0 ? totalRatings / reviewCount : 0;

//     return (
//         <div className="rating flex flex-row items-center">
//             <div className='flex flex-row w-22'>{renderStars(Math.round(averageRating))}</div>
//             <p className="review-count mx-1">{`(${reviewCount})`}</p>
//         </div>
//     );
// };

export const StarRating = (props: { rating: number }) => {
    return (
        <div className="rating flex flex-row items-center">
            <div className='flex flex-row w-22'>{renderStars(props.rating)}</div>
        </div>
    );
};


export const StarRatingAverage = (props:{id:number}) => {

      const reviews: ReviewData[] = reviewData.filter(review => review.id === props.id);

        let totalRatings = 0;
        let reviewCount = reviews.length;

        if (reviews) {
            reviews.forEach(review => {
                totalRatings += review.rating;
            });
        }

        const averageRating = reviewCount > 0 ? totalRatings / reviewCount : 0;

    return (
        <div className="rating flex flex-row items-center">
            <div className='flex flex-row w-22'>{renderStars(Math.round(averageRating))}</div>
            <p className="review-count mx-1">{`(${reviewCount})`}</p>
        </div>
    )
}