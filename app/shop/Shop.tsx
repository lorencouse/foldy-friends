"use client";

import React from "react";
import { CategoryCard } from "@/components/ProductCategory/CategoryCard";
import { Collections } from "@/components/ProductCategory/Collections";
import { useShopContext } from "@/context/ShopContext";
import Link from "next/link";
import { productCategories as categories } from "@/data/constants";
import Category from "./category/[category]/Category";
import { ShopHero } from "@/components/shop/ShopHero";
import { CollectionHeading } from "@/components/ProductCategory/CollectionHeading";
import { CategoryBanner } from "@/components/ProductCategory/CategoryBanner";
import { Product, TopSellersProps } from "@/types";

const Shop = ({
  products,
  topSellers,
}: {
  products: Product[];
  topSellers: TopSellersProps[];
}) => {
  const { setActiveCategory } = useShopContext();

  return (
    <div className="shop-container">
      <ShopHero />
      <div className="capitalize relative md:mx-8 mx-2 my-16">
        <CollectionHeading header="Explore All Categories" />
        <div className="flex flex-wrap justify-center sm:justify-around items-center pt-5 mt-4">
          {categories.map((category) => (
            <div className="w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4" key={category}>
              <CategoryCard key={category} category={category} />
            </div>
          ))}
        </div>
      </div>

      <div className="top-sellers">
        {topSellers.map(({ category, products }) => (
          <React.Fragment key={category}>
            <CategoryBanner category={category} />
            <Collections products={products} header={category} />
            <Link href={`/category/${category}`}>
              <p
                className="capitalize underline text-lg font-semibold hover:text-red-500 border border-b-1 border-t-0 pb-16 text-center"
                onClick={() => {
                  setActiveCategory(category);
                  window.scrollTo(0, 0);
                }}
              >
                View All {`${category}`}
              </p>
            </Link>
          </React.Fragment>
        ))}
      </div>

      <CollectionHeading header="All Crafting Supplies" />

      <Category products={products} category="all-products" />
    </div>
  );
};

export default Shop;
