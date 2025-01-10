import React from "react";
import Image from "next/image";

export const ShopHero = () => {
  return (
    <div className="flex flex-wrap justify-between  bg-base-300 mb-24">
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center text-left   ">
        <div className="flex flex-col text-center md:m-20 my-8 bg-base-100/20 backdrop-blur-2xl lg:p-16 p-10 rounded-3xl border-10 border-base-100 ">
          <p className="underline font-semibold text-2xl my-3 text-white ">
            - New Arrivals! -
          </p>
          <span className="md:text-6xl text-4xl text-white my-4">
            Get Crafting
          </span>
          <span className="md:text-5xl text-3xl text-white ">
            Get Createive
          </span>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-base-100 ">
        <div className="border-20 border-base-100 hero paper ">
          <Image
            className="w-full rounded-2xl"
            src="/assets/shopPage/kids-crafting-origami.webp"
            alt="Kids Crafting Origami"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};
