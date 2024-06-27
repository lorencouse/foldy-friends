import React, { useState, useEffect } from "react";
import { useShopContext } from "../context/ShopContext";
import { ProductData } from "../types";
import { Collections } from "../components/ProductCategory/Collections";
import { ButtonRoundBlack } from "../components/BannerButton";
import AllProductFilters from "../components/ProductCategory/ProductFilters/AllProductFilters";

const Category = ({
  category,
  isCategory,
}: {
  category?: string;
  isCategory?: boolean;
}) => {
  const { allProducts } = useShopContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);

  return (
    <div className="lg:w-11/12 m-auto pt-6">
      <div className="border-b-2 pb-6 border-base-content border-dashed ">
        <img
          src={`/assets/categories/${category}-banner.png`}
          alt={`${category} banner`}
          
        />
      </div>
      <div className="sort-by flex flex-row flex-wrap justify-between items-center m-3">
        {filteredProducts.length > 0 && (
          <p className="my-5">
            <span className="font-extrabold">
              Showing 1-{filteredProducts.length}
            </span>{" "}
            out of {filteredProducts.length} products
          </p>
        )}

        <AllProductFilters
          allProducts={allProducts}
          setFilteredProducts={setFilteredProducts}
          isCategory={isCategory}
          category={category}
        />
      </div>
      <Collections header={category} productData={filteredProducts} />
      {/* <ButtonRoundBlack label="Load More" url="" /> */}
    </div>
  );
};

export default Category;
