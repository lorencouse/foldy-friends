"use client";

import React from "react";
import { Hero } from "@/components/Home/Hero";
import { Collections } from "@/components/ProductCategory/Collections";
import { Offers } from "@/components/Home/Offers";
import { Subscribe } from "@/components/Home/Subscribe";
import { Product } from "@/types";

const Home = ({
  newProducts,
  modelProducts,
}: {
  newProducts: Product[];
  modelProducts: Product[];
}) => {
  return (
    <div className="flex flex-col justify-between">
      <Hero />
      <div className="lg:mx-16 md:mx-12">
        <Collections
          header="Top Selling Paper Models"
          products={modelProducts}
        />
        <Offers />
        <Collections header="New Items" products={newProducts} />
        <Subscribe />
      </div>
    </div>
  );
};

export default Home;
