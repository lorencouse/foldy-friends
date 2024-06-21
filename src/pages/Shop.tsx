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
      <h2 className="my-8">Explore All Categories</h2>
      <div className="categories flex flex-row justify-around border border-b-1 border-t-0 my-8">
        {categories.map((category) => (
          <CategoryCard key={category} category={category} />
        ))}
      </div>

      <div className="top-sellers">
        {topSellers.map(({ category, products }) => (
          <React.Fragment key={category}>
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

      <div className="all-products ">
        <h2 className="my-10 text-5xl font-semibold">All Products</h2>

        <div className="flex justify-end items-end w-full ">
          <AllProductFilters
            allProducts={allProducts}
            setFilteredProducts={setFilteredProducts}
          />
        </div>
        <Collections productData={filteredProducts} header="" />
      </div>
    </div>
  );
};

export default Shop;
