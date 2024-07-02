import React from "react";
import { Item } from "./Item";
import { ProductData } from "../../types";

export const Collections = (props: {
  header: string;
  productData: ProductData[];
}) => {
  return (
    <div className="capitalize relative my-8">
      <div className="collection-heading flex justify-center relative paper-heading">
        <h2 className="collections-heading text-white py-6 md:px-20 px-14 w-full rounded-md mx-5 relative z-20 leading-none">
          <span className="relative z-20">
            {props.header.replace("-", " ")}
          </span>
          <div className="w-full flex lg:justify-center">
            <img
              src="/assets/origami-cat-inverted.png"
              alt=""
              className="h-36 w-36 absolute transform -translate-y-1/2 md:left-0 -left-10 z-10 drop-shadow-lg"
            />
            
          </div>
        </h2>
      </div>
      <div className="flex flex-row justify-around items-center flex-wrap pt-5 mt-4">
        {props.productData.map((product, key) => {
          return <Item productData={product} key={key} />;
        })}
      </div>
    </div>
  );
};
