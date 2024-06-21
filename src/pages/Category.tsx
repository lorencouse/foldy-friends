import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Collections } from "../components/ProductCategory/Collections";
import { useShopContext } from "../context/ShopContext";
import { ButtonRoundBlack } from "../components/BannerButton";
import PriceFiltersMinMax from "../components/ProductCategory/ProductFilters/PriceFilters";
import SortProductsByDropdown from "../components/ProductCategory/ProductFilters/SortProductsByDropdown";
import { ProductData } from "../types";
import {
  filterProductCategory,
  filterProductTag,
} from "../tools/ProductFilterFunctions";

const Category = ({
  category,
  isCategory,
}: {
  category: string;
  isCategory: boolean;
}) => {
  const { allProducts } = useShopContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    if (!category) return;
    if (allProducts.length === 0) return;

    if (isCategory) {
      const categoryProducts = filterProductCategory(allProducts, category);
      setFilteredProducts(categoryProducts);
    } else {
      const tagProducts = filterProductTag(allProducts, category);
      setFilteredProducts(tagProducts);
    }
  }, [category, allProducts]);

  if (!category) return null;

  return (
    <div className="lg:w-11/12 m-auto">
      <Image
        src={`/Assets/banner_${category}.png`}
        alt={`${category} banner`}
        width={1200}
        height={400}
        priority={true}
      />
      <div className="sort-by flex flex-row flex-wrap justify-between items-center m-3 ">
        <p className="my-5">
          <span className="font-extrabold">Showing 1-12</span> out of{" "}
          {filteredProducts.length} products
        </p>

        <div className="flex justify-end items-end w-full md:w-96">
          <PriceFiltersMinMax
            products={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />

          <SortProductsByDropdown
            products={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />
        </div>
      </div>

      <Collections header={category as string} productData={filteredProducts} />
      <ButtonRoundBlack label="Load More" url="" />
    </div>
  );
};

export default Category;
