import React, { useMemo } from "react";
import { CategoryCard } from "../components/ProductCategory/CategoryCard";
import { Collections } from "../components/ProductCategory/Collections";
import {
  filterProductCategory,
  shuffleProducts,
} from "../tools/ProductFilterFunctions";
import { useShopContext } from "../context/ShopContext";
import Link from "next/link";
import { productCategories as categories } from "../data/constants";
import Category from "./Category";
import { ShopHero } from "../components/shop/ShopHero";
import { CollectionHeading } from "../components/ProductCategory/CollectionHeading";
import { CategoryBanner } from "../components/ProductCategory/CategoryBanner";


const Shop = () => {
  const { setActiveCategory, allProducts } = useShopContext();

  const topSellers = useMemo(() => {
    return categories.map((category) => ({
      category,
      products: shuffleProducts(
        filterProductCategory(allProducts, category),
        4,
      ),
    }));
  }, [allProducts]);


  return (
    <div className="shop-container">
      <ShopHero />
      <CollectionHeading header="Explore All Categories" />
      <div className="categories flex flex-row flex-wrap justify-around border border-b-1 border-t-0 my-8">
        {categories.map((category) => (
          <CategoryCard key={category} category={category} />
        ))}
      </div>

      <div className="top-sellers">
        {topSellers.map(({ category, products }) => (
          <React.Fragment key={category}>
            <CategoryBanner category={category} />
            <Collections productData={products} header={category} />
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

      <Category category="all-products" />
    </div>
  );
};

export default Shop;
