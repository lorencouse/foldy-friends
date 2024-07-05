import React from "react";
import { ButtonRoundRed } from "../BannerButton";

export const Hero = () => {
  return (
    <div className=" flex flex-wrap justify-between  bg-gradient-to-t from-base-100 to-primary">
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center text-left mt-20">
        <div className="flex flex-col font-semibold text-center bg-base-100 rounded-2xl p-10 mx-10 ">
          <p>New Arrivals</p>
          <p className="banner-heading">
            Create New <br /> Amimal Firends
          </p>
        </div>
        <ButtonRoundRed label="Shop Now" url="/shop" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center ">
        <div className="hero paper border-20 border-base-100 bg-base-100 ">
          <img
            className="w-full rounded-2xl "
            src="/assets/homePage/happy-kids-folding-origami-1024.webp"
            alt="Hero Model"
          />
        </div>
      </div>
    </div>
  );
};
