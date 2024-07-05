import React, { useState } from "react";
import { ReviewsBox } from "./Reviews/ReviewsBox";

interface DescriptionBoxProps {
  description: string;
  id: string;
}

export const DescriptionBox: React.FC<DescriptionBoxProps> = ({
  description,
  id,
}) => {
  const [descriptionBox, setDescriptionBox] = useState(true);

  return (
    <div className="my-16 md:mx-0 mx-4">
      <div className="flex flex-row justify-between">
        <div className="description-box-buttons flex flex-row items-start">
          <button
            onClick={() => setDescriptionBox(true)}
            className={`p-3 ${descriptionBox ? "bg-base-200 font-semibold" : "bg-base-100"} border-t border-l  border-base-300 w-32 rounded-tl-xl`}
          >
            Description
          </button>
          <button
            onClick={() => setDescriptionBox(false)}
            className={`p-3 ${!descriptionBox ? "bg-base-200 font-semibold" : "bg-base-100"} border-t border-l border-r border-base-300 w-32 rounded-tr-xl`}
          >
            Reviews
          </button>
        </div>
        <img
          src="/assets/dog-mascot-inverted-grey.png"
          alt=""
          className="w-20 h-20 absolute md:right-36 right-6  z-10 -translate-y-6 "
        />
      </div>

      <div className="description-text-box p-10 border border-1 border-base-300 text-left rounded-b-xl rounded-tr-xl">
        {descriptionBox ? (
          <div dangerouslySetInnerHTML={{ __html: description || "" }} />
        ) : (
          <ReviewsBox id={id} />
        )}
      </div>
    </div>
  );
};
