import React, { useState } from "react";
import { ReviewsBox } from "./Reviews/ReviewsBox";

export const DescriptionBox = ({ description, id }) => {
  const [descriptionBox, setDescriptionBox] = useState(true);

  return (
    <div className="">
      <div className="description-box-buttons flex flex-row items-start">
        <button
          onClick={() => setDescriptionBox(true)}
          className={`p-3 ${descriptionBox ? "bg-gray-50 font-semibold" : "bg-white"} outline outline-1 outline-gray-400 w-32`}
        >
          Description
        </button>
        <button
          onClick={() => setDescriptionBox(false)}
          className={`p-3 ${!descriptionBox ? "bg-gray-50 font-semibold" : "bg-white"} outline outline-1 outline-gray-400 w-32`}
        >
          Reviews
        </button>
      </div>

      <div className="description-text-box p-10 outline outline-1 outline-gray-400 text-left">
        {descriptionBox ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <ReviewsBox id={id} />
        )}
      </div>
    </div>
  );
};
