import React from "react";
import { ButtonRoundRed } from "../BannerButton";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className=" flex flex-wrap justify-between  bg-linear-to-t from-base-100 to-primary">
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center text-left md:mt-20 mt-5">
        <div className="flex flex-col font-semibold text-center bg-base-100 rounded-2xl sm:p-20 p-5 mx-10 ">
          <p className="sm:text-xl ">- Animal Models -</p>
          <span className="sm:text-6xl text-4xl sm:my-6 ">Make New</span>

          <span className=" sm:text-4xl text-2xl ">Origami Friends</span>
        </div>
        <ButtonRoundRed label="Shop Now" url="/shop" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center ">
        <div className="hero paper border-20 border-base-100 bg-base-100 ">
          <Image
            className="w-full rounded-2xl "
            src="/assets/homePage/happy-kids-folding-origami-1024.webp"
            alt="Hero Model"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};
