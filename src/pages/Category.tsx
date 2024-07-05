import React, { useState } from "react";
import { useShopContext } from "../context/ShopContext";
import { ProductInfo } from "../types";
import { Collections } from "../components/ProductCategory/Collections";
import AllProductFilters from "../components/ProductCategory/ProductFilters/AllProductFilters";
import { CategoryBanner } from "../components/ProductCategory/CategoryBanner";

const Category = ({
  category,
  isCategory,
}: {
  category?: string;
  isCategory?: boolean;
}) => {
  const { allProducts, setShowMiniCart } = useShopContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductInfo[]>([]);

  return (
    <div
      className=" lg:w-11/12 m-auto pt-6  "
      onClick={() => setShowMiniCart(false)}
    >
      { category && <CategoryBanner category={category} /> }

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
          allProducts={allProducts}
          setFilteredProducts={setFilteredProducts}
          isCategory={isCategory}
          category={category}
        />
      </div>
        { category && <Collections header={category} productData={filteredProducts} /> }
      
    </div>
  );
};

export default Category;
