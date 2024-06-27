import React from "react";

export const ShopHero = () => {
  return (
    <div className="flex flex-wrap justify-between  bg-secondary ">
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center text-left   ">
        <div className="flex flex-col font-semibold text-center my-20 bg-base-100/20 backdrop-blur-2xl p-20 rounded-3xl border-10 border-base-100  ">
          <p className="underline font-semibold text-xl my-3 text-base-content">
            New Arrivals!
          </p>
          <p className="banner-heading text-white">
            Get Crafting <br /> Get Createive
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 border-20 border-base-100">
        <img
          className="w-full rounded-none"
          src="/assets/shopPage/kids-crafting-origami.webp"
          alt="Hero Model"
        />
      </div>
    </div>
  );
};
