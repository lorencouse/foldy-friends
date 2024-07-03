import React from "react";

export const CategoryBanner = ({ category }: { category: string }) => {
  return (
    <div className=" pb-6 category-banner relative ">
      <div className="tape-section"></div>

      <img
        src={`/assets/categories/${category}-banner.png`}
        alt={`${category} banner`}
      />
      <div className="tape-section"></div>
    </div>
  );
};
