import React from "react";
import Image from "next/image";

export const CategoryBanner = ({ category }: { category: string }) => {
  return (
    <div className="pb-6 category-banner relative md:mb-14 flex justify-center w-full align-middle">
      <div className="bg-primary rounded-2xl max-w-3xl">
        <div className="tape-section max-w-3xl"></div>

        <Image
          src={`/assets/categories/${category}-banner.png`}
          alt={`${category} banner`}
          width={1000}
          height={200}
        />
        <div className="tape-section max-w-3xl"></div>
      </div>
    </div>
  );
};
