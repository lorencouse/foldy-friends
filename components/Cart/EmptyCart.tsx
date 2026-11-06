import React from "react";
import { ButtonRoundRed } from "../BannerButton";

export const EmptyCart = () => {
  return (
    <div className="m-8 flex flex-col items-center">
      <h2>Looks like your cart is empty....</h2>
      <ButtonRoundRed label="Go to Shop" url="/" />
    </div>
  );
};
