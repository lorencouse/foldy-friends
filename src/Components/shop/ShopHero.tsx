import React from "react";

export const ShopHero = () => {
  return (
    <div className="flex flex-wrap justify-between  bg-gradient-to-t from-base-100 to-secondary-content">
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center text-left mt-10">
        <div className="flex flex-col font-semibold text-center my-20">
          <p>New Arrivals</p>
          <p className="banner-heading">
            Get Crafting <br /> Get Createive
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <img
          className="w-full"
          src="/assets/shopPage/kids-crafting-origami.webp"
          alt="Hero Model"
        />
      </div>
    </div>
  );
};
