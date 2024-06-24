import React from "react";
import { ButtonRoundRed } from "../BannerButton";

export const Hero = () => {
  return (
    <div className="flex flex-wrap justify-between  bg-gradient-to-t from-base-100 to-secondary-content">
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center text-left mt-10">
        <div className="flex flex-col font-semibold text-center">
          <p>New Arrivals</p>
          <p className="banner-heading">
            New <br /> Cute <br /> Amimal Firends
          </p>
        </div>
        <ButtonRoundRed label="Shop Now" url="/shop" />
      </div>
      <div className="w-full md:w-1/2">
        <img
          className="w-full"
          src="/assets/homePage/happy-kids-folding-origami-1024.webp"
          alt="Hero Model"
        />
      </div>
    </div>
  );
};
