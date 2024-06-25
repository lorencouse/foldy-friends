import React from "react";
import { ButtonRoundRed } from "../BannerButton";

export const Hero = () => {
  return (
    <div className="flex flex-wrap justify-between  bg-gradient-to-t from-base-100 to-primary">
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center text-left mt-20">
        <div className="flex flex-col font-semibold text-center bg-base-100/30 p-10  ">
          <p>New Arrivals</p>
          <p className="banner-heading">
            Create New <br /> Amimal Firends
          </p>
        </div>
        <ButtonRoundRed label="Shop Now" url="/shop" />
      </div>
      <div className="w-full md:w-1/2  flex items-center justify-center">
        <img
          className="w-full rounded-none border-20 border-base-100 "
          src="/assets/homePage/happy-kids-folding-origami-1024.webp"
          alt="Hero Model"
        />
      </div>
    </div>
  );
};
