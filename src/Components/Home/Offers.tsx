import React from "react";
import { ButtonRoundRed } from "../BannerButton";

export const Offers = () => {
  return (
    <div className="flex flex-row flex-wrap lg:w-10/12 m-auto justify-around items-center bg-gradient-to-t from-base-100 to-primary">
      <div className="offers-left flex flex-col justify-center items-center p-10 mt-10 w-full lg:w-1/2">
        <p className="banner-heading">
          Find the <br />
          Perfect Gift
        </p>
        <p className="banner-sub-text">
          Great prices on our best selling items
        </p>
        <ButtonRoundRed label="Shop Now" url="/shop" />
      </div>
      <div className="offers-right items-center w-full lg:w-1/2 ">
        <img
          className="rounded-sm md:rounded-l-full border-20 border-base-100"
          src="/assets/homePage/boy-giving-mom-origami-dog.webp"
          alt=""
        />
      </div>
    </div>
  );
};
