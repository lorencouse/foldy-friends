import React from "react";

export const CategoryBanner = ({ category }: { category: string }) => {
  return (
    <div className=" pb-6 category-banner relative ">
      <div className="tape-section"></div>
      <div className="bg-primary/70 rounded-2xl">

      <img
        src={`/assets/categories/${category}-banner.png`}
        alt={`${category} banner`}
        />
        </div>
      <div className="tape-section"></div>
    </div>
  );
};
