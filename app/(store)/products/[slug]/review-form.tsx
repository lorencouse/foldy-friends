"use client";

import { useActionState, useState } from "react";
import { type ReviewState, submitReview } from "./actions";

export function ReviewForm({ productId }: { productId: string }) {
  const [state, action, pending] = useActionState<ReviewState, FormData>(submitReview, {});
  const [rating, setRating] = useState(5);

  if (state.ok) {
    return <p className="bg-paper-2 p-6 text-lead">Thank you. Your review is up.</p>;
  }

  return (
    <form action={action} className="space-y-5 bg-paper-2 p-6 sm:p-8">
      <h3 className="text-lead">Write a review</h3>
      <input type="hidden" name="productId" value={productId} />
      <fieldset>
        <legend className="field-label">Your rating</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={n}
                checked={rating === n}
                onChange={() => setRating(n)}
                className="peer sr-only"
              />
              <span className="sr-only">{n} out of 5</span>
              <Star filled={n <= rating} />
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="review-title" className="field-label">
          Title
        </label>
        <input id="review-title" name="title" required maxLength={80} className="field" />
      </div>
      <div>
        <label htmlFor="review-body" className="field-label">
          Your review
        </label>
        <textarea id="review-body" name="body" required minLength={10} rows={4} className="field" />
      </div>
      {state.error && (
        <p role="alert" className="text-danger">
          {state.error}
        </p>
      )}
      <button type="submit" className="btn" disabled={pending}>
        {pending ? "Posting…" : "Post review"}
      </button>
    </form>
  );
}

export function Star({ filled, size = 32 }: { filled: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <polygon
        points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9"
        fill={filled ? "#f2c12e" : "#d6d0c4"}
      />
    </svg>
  );
}
