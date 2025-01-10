import React from "react";

export const CategoryBanner = ({ category }: { category: string }) => {
  return (
    <div className="pb-6 category-banner relative md:mb-14 flex justify-center w-full align-middle">
      <div className="bg-primary/70 rounded-2xl max-w-3xl">
        <div className="tape-section max-w-3xl"></div>

        <img
          src={`/assets/categories/${category}-banner.png`}
          alt={`${category} banner`}
        />
        <div className="tape-section max-w-3xl"></div>
      </div>
    </div>
  );
};
