import React from "react";
import { ButtonRoundRed } from "../BannerButton";

export const Offers = () => {
  return (
    <div className=" flex flex-row flex-wrap-reverse xl:w-10/12 m-auto lg:justify-between justify-center items-center bg-gradient-to-t from-base-100 to-primary rounded-2xl">
      <div className="offers-left flex flex-col justify-center items-center p-10 mt-10 w-full lg:w-1/2">
        <div className="text-box-offers  bg-base-100 rounded-2xl flex flex-col  items-center p-10 mb-10 lg:mr-14">
          <p className="md:text-5xl text-2xl font-bold text-center">
            Find the 
            
          </p>
          <p className="md:text-5xl text-2xl font-bold text-center mt-4">
           
            Perfect Gift!
          </p>
          <p className="banner-sub-text text-lg font-bold text-center ">
            Great prices on our best selling items
          </p>
          <ButtonRoundRed label="Shop Now" url="/shop" />
        </div>
      </div>
      <div className="flex offers-right items-start justify-end w-auto lg:w-1/2 ">
        <img
          className="rounded-sm md:rounded-l-full border-20 border-base-100 max-w-xl"
          src="/assets/homePage/boy-giving-mom-origami-dog.webp"
          alt=""
        />
      </div>
    </div>
  );
};
