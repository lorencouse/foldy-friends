import React, { useMemo, useState, useEffect } from "react";
import { CategoryCard } from "../components/ProductCategory/CategoryCard";
import { Collections } from "../components/ProductCategory/Collections";
import {
  filterProductCategory,
  shuffleProducts,
} from "../tools/ProductFilterFunctions";
import { useShopContext } from "../context/ShopContext";
import Link from "next/link";
import AllProductFilters from "../components/ProductCategory/ProductFilters/AllProductFilters";
import { productCategories as categories } from "../data/constants";
import { ProductData } from "../types";
import Category from "./Category";
import { ShopHero } from "../components/shop/ShopHero";


const Shop = () => {
  const { setActiveCategory, allProducts } = useShopContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);

  const topSellers = useMemo(() => {
    return categories.map((category) => ({
      category,
      products: shuffleProducts(
        filterProductCategory(allProducts, category),
        4,
      ),
    }));
  }, [allProducts, categories]);


  return (
    <div className="shop-container">
      <ShopHero />
      <h2 className="my-8">Explore All Categories</h2>
      <div className="categories flex flex-row justify-around border border-b-1 border-t-0 my-8">
        {categories.map((category) => (
          <CategoryCard key={category} category={category} />
        ))}
      </div>

      <div className="top-sellers">
        {topSellers.map(({ category, products }) => (
          <React.Fragment key={category}>
            <img src={`/assets/categories/${category}-banner.png`} alt="" />
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

      <h2 className="my-10 text-5xl font-semibold">All Crafting Supplies</h2>
      {/* <img src="/assets/categories/all-supplies-banner-2.png" alt="" /> */}

      <Category category="all-products" />

    </div>
  );
};

export default Shop;
