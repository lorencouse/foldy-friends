import React from "react";
import { Item } from "./Item";
import { ProductData } from "../../types";

export const Collections = (props: {
  header: string;
  productData: ProductData[];
}) => {
  return (
    <div className="capitalize my-10 border-t-4 border-dashed border-black pt-2">
      <h2 className="collections-heading text-base-100 bg-secondary p-6 shadow-xl rounded-2xl mx-5">
        {props.header.replace("-", " ")}
      </h2>
      {/* <hr className="w-56 h-1 my-5 m-auto bg-black  " /> */}
      <div className=" flex flex-row justify-around items-center flex-wrap border-t-4 border-dashed border-black pt-5 mt-4 ">
        {props.productData.map((product, key) => {
          return <Item productData={product} key={key} />;
        })}
      </div>
    </div>
  );
};
