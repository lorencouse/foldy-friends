import React from "react";

export const HamburgerIcon = () => {
  return (
    <div
      className="hamburger h-8 w-8 outline outline-2 outline-white rounded-md flex flex-col justify-around items-center p-2  hover:bg-base-200 "
      onClick={toggleMenu}
    >
      <HamburderLine />
      <HamburderLine />
      <HamburderLine />
    </div>
  );
};
