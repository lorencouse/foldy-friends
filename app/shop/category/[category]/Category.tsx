"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { Collections } from "@/components/ProductCategory/Collections";
import AllProductFilters from "@/components/ProductCategory/ProductFilters/AllProductFilters";
import { CategoryBanner } from "@/components/ProductCategory/CategoryBanner";

const Category = ({
  products,
  category,
  isCategory,
}: {
  products: Product[];
  category?: string;
  isCategory?: boolean;
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  return (
    <div className=" lg:w-11/12 m-auto pt-6  ">
      {category && <CategoryBanner category={category} />}

      <div className="sort-by flex flex-row flex-wrap justify-between items-center m-3 ">
        {filteredProducts.length > 0 && (
          <p className="my-5">
            <span className="font-extrabold">
              Showing 1-{filteredProducts.length}
            </span>{" "}
            out of {filteredProducts.length} products
          </p>
        )}

        <AllProductFilters
          allProducts={products}
          setFilteredProducts={setFilteredProducts}
          isCategory={isCategory}
          category={category}
        />
      </div>
      {category && (
        <Collections header={category} products={filteredProducts} />
      )}
      {filteredProducts.length > 0 && (
        <p className="mb-12">
          <span className="font-extrabold">
            Showing 1-{filteredProducts.length}
          </span>{" "}
          out of {filteredProducts.length} products
        </p>
      )}
    </div>
  );
};

export default Category;
