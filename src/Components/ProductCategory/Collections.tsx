import React from "react";
import { Item } from "./Item";
import { ProductData } from "../../types";
import { CollectionHeading } from "./CollectionHeading";

export const Collections = (props: {
  header: string;
  productData: ProductData[];
}) => {
  return (
    <div className="capitalize relative my-8">
      <CollectionHeading header={props.header} />
      <div className="flex flex-row justify-around items-center flex-wrap pt-5 mt-4">
        {props.productData.map((product, index) => {
          return <Item productData={product} key={product.id} itemIndex={index} />;
        })}
      </div>
    </div>
  );
};
