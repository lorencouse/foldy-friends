import React from "react";
import { ButtonRoundRed } from "../BannerButton";

export const Offers = () => {
  return (
    <div className="flex flex-row flex-wrap lg:w-10/12 m-auto justify-around items-center bg-gradient-to-t from-base-100 to-secondary-content">
      <div className="offers-left justify-start items-start text-left p-10 mt-10">
        <p className="banner-heading">
          New Arrivals <br />
          Just For You
        </p>
        <p className="banner-sub-text">
          Great prices on our best selling items
        </p>
        <ButtonRoundRed label="Shop Now" url="/shop" />
      </div>
      <div className="offers-right items-baseline ">
        <img src="/Assets/exclusive_image.png" alt="" />
      </div>
    </div>
  );
};
