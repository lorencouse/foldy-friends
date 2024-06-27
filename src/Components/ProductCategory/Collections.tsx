import React from "react";
import { Item } from "./Item";
import { ProductData } from "../../types";

export const Collections = (props: {
  header: string;
  productData: ProductData[];
}) => {
  return (
    <div className="capitalize my-10 border-t-2 border-dashed border-base-content pt-2 relative">
      <div className="collection-heading flex justify-center relative">
        <h2 className="collections-heading text-white bg-secondary py-6 md:px-20 px-8 md:min-w-96 min-w-72 drop-shadow-md shadow-xl rounded-2xl mx-5 relative z-20">
          <span className="relative z-20">
            {props.header.replace("-", " ")}
          </span>
          <img
            src="/assets/foldy-friends-logo-192x192.png"
            alt=""
            className="h-36 w-36 absolute left-16 transform -translate-x-full top-24 -translate-y-1/2 z-10"
          />
        </h2>
      </div>
      <div className="flex flex-row justify-around items-center flex-wrap border-t-4 border-dashed border-base-content pt-5 mt-4">
        {props.productData.map((product, key) => {
          return <Item productData={product} key={key} />;
        })}
      </div>
    </div>
  );
};
