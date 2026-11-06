import React, { useState } from "react";
import { ButtonSquareRed } from "../../BannerButton";
import { CreateStarRating } from "./StarRating";
import { ProductReview } from "../../../types";
import { UpdateSvg } from "../../svgPaths";
import { Alert } from "../../Alert";

export const WriteReviewBox = ({ productId }: { productId: string }) => {
  const emptyReview: ProductReview = {
    id: "",
    created_at: new Date(),
    product_id: productId.toString(),
    user_id: "",
    title: "",
    content: "",
    rating: 0,
  };

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState<ProductReview>(emptyReview);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  async function createReview() {
    if (review.title === "" || review.content === "" || rating === 0) {
      setAlertMessage(
        "Please fill in all required fields, including a star rating!",
      );
      setShowAlert(true);
      return;
    }
    setAlertMessage("Review submitted!");
    setReview(emptyReview);
    setShowAlert(true);
    setRating(0);
    setTimeout(() => setShowAlert(false), 2000);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setReview((oldReview: ProductReview) => ({
      ...oldReview,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3>Leave a Review:</h3>
      {showAlert && <Alert message={alertMessage} />}
      <div className="title-stars flex flex-row flex-wrap items-baseline  ">
        <input
          type="text"
          placeholder="Title..."
          value={review.title}
          name="title"
          onChange={handleOnChange}
          className="w-96 border border-gray-300 rounded-md mb-8 p-2"
        />
        <CreateStarRating rating={rating} setRating={setRating} />
      </div>
      <textarea
        
        placeholder="Review content..."
        value={review.content}
        name="content"
        onChange={handleOnChange}
        className="w-full min-h-72 border border-gray-300 rounded-md p-2 text-start"
      />

      <ButtonSquareRed label="Submit" icon={UpdateSvg} onClick={createReview} />
    </div>
  );
};
