import React from "react";
import { Item } from "./Item";
import { ProductData } from "../../types";

export const Collections = (props: {
  header: string;
  productData: ProductData[];
}) => {
  return (
    <div className="capitalize my-10">
      <h2 className="collections-heading">{props.header}</h2>
      <hr className="w-56 h-1 my-5 m-auto bg-black  " />
      <div className="popular-items flex flex-row justify-around items-center flex-wrap  ">
        {props.productData.map((product, key) => {
          return (
            <Item
              productData={product} key={key}
            />
          );
        })}
      </div>
    </div>
  );
};
