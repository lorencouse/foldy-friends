// src/components/ProductCategory/Collections.tsx
import React from "react";
import { Item } from "./Item";
import { Product } from "@/types";
import { CollectionHeading } from "./CollectionHeading";

export const Collections = (props: { header: string; products: Product[] }) => {
  return (
    <div className="capitalize relative md:mx-8 mx-2 my-16">
      <CollectionHeading header={props.header} />
      <div className="flex flex-wrap justify-center sm:justify-around items-center pt-5 mt-4">
        {props.products.map((product, index) => {
          return (
            <div className="w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4" key={product.id}>
              <Item productData={product} itemIndex={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
