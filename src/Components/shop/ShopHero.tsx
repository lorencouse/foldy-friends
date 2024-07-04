import React from "react";

export const ShopHero = () => {
  return (
    <div className="flex flex-wrap justify-between  bg-base-300 mb-24">
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center text-left   ">
        <div className="flex flex-col text-center m-20 bg-base-100/20 backdrop-blur-2xl lg:p-20 p-10 rounded-3xl border-10 border-base-100  ">
          <p className="underline font-semibold text-2xl my-3 text-white">
            - New Arrivals! -
          </p>
          <p className="banner-heading text-white">
            Get Crafting <br /> Get Createive
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-base-100">
        <div className="border-20 border-base-100 hero paper ">
          <img
            className="w-full"
            src="/assets/shopPage/kids-crafting-origami.webp"
            alt="Hero Model"
          />
        </div>
      </div>
    </div>
  );
};
