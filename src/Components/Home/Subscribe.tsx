import React from "react";

export const Subscribe = () => {
  return (
    <div className="promo-box relative flex flex-col justify-center items-center bg-secondary pt-12 my-10 rounded-2xl">
      <div className="subscribe-box my-12 text-center ">
        <p className="banner-heading text-white px-6">Get in on Exclusive Offers!</p>
        <form action="submit">
          <input
            type="email"
            name=""
            id=""
            className="py-3 rounded-full  border-base-300 w-11/12 md:3/4 mx-4 my-8 pl-6 shadow-lg"
          />
          <button className="rounded-full w-48 bg-base-content p-3 shadow-lg text-base-100 duration-200 hover:scale-105 my-5 -ml-52">
            Subscribe
          </button>
        </form>
        <p className="banner-sub-text text-white text-xl">
          Subscribe to stay up to date on our latest sales and hottest items
        </p>
      </div>
    </div>
  );
};
