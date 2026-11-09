"use client";

import { useActionState, useState } from "react";
import { Field, FormError, TextareaField } from "@/components/field";
import { Star } from "@/components/stars";
import { type ReviewState, submitReview } from "./actions";

export function ReviewForm({ productId }: { productId: string }) {
  const [state, action, pending] = useActionState<ReviewState, FormData>(submitReview, {});
  const [rating, setRating] = useState(5);

  if (state.ok) {
    return <p className="sheet p-6 text-lead font-bold">Thank you. Your review is up.</p>;
  }

  return (
    <form action={action} className="sheet space-y-5 p-6 sm:p-8">
      <h3 className="text-2xl font-bold">Write a review</h3>
      <input type="hidden" name="productId" value={productId} />
      <fieldset>
        <legend className="field-label">Your rating</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <label
              key={n}
              className="flex size-11 cursor-pointer items-center justify-center rounded-lg has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sky"
            >
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
      <Field id="review-title" name="title" label="Title" maxLength={80} />
      <TextareaField id="review-body" name="body" label="Your review" minLength={10} rows={4} />
      <FormError message={state.error} />
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Posting…" : "Post review"}
      </button>
    </form>
  );
}
