import React, { useState } from "react";
import { ReviewsBox } from "./Reviews/ReviewsBox";

export const DescriptionBox = ({ description, id }) => {
  const [descriptionBox, setDescriptionBox] = useState(true);

  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <div className="description-box-buttons flex flex-row items-start">
          <button
            onClick={() => setDescriptionBox(true)}
            className={`p-3 ${descriptionBox ? "bg-gray-50 font-semibold" : "bg-white"} border-t border-l  border-base-300 w-32 rounded-tl-xl `}
          >
            Description
          </button>
          <button
            onClick={() => setDescriptionBox(false)}
            className={`p-3 ${!descriptionBox ? "bg-gray-50 font-semibold" : "bg-white"} border-t border-l border-r border-base-300 w-32 rounded-tr-xl`}
          >
            Reviews
          </button>
        </div>
        <img
          src="/assets/dog-mascot.png"
          alt=""
          className="w-20 h-20 absolute md:left-96 left-80  z-10 -translate-y-1/4 "
        />
      </div>

      <div className="description-text-box p-10 border border-1 border-base-300 text-left rounded-b-xl rounded-tr-xl">
        {descriptionBox ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <ReviewsBox id={id} />
        )}
      </div>
    </div>
  );
};
