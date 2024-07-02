import React from "react";

export const CategoryBanner = ({
  img,
  heading,
  subHeading,
}: {
  img: string;
  heading: string;
  subHeading: string;
}) => {
  return (
    <div className="flex flex-row bg-primary">
      <div className="category-banner-image relative mx-12">
        <div className="mask mask-hexagon-2 h-64 w-64 bg-white absolute top-8 left-8"></div>
        <img
          src={img}
          alt={heading}
          className="mask mask-hexagon-2 relative z-10 h-64 w-64 m-6"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-5/6">
        <h2>{heading}</h2>
        <h3>{subHeading}</h3>
      </div>
    </div>
  );
};
