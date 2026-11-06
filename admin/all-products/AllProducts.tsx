"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AllProductFilters from "@/components/ProductCategory/ProductFilters/AllProductFilters";
import { Product } from "@/types";
import { LoadingScreen } from "@/components/Product/LoadingScreen";
import { VariationSelector } from "@/components/Product/VariantSelector";
import { productCategories } from "@/data/constants";

const AllProducts = ({ products }: { products: Product[] }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("all-products");

  useEffect(() => {
    if (products && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  if (!products || products.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="lg:mx-16 md:mx-12 my-8 ">
      <h1>All Products</h1>
      <Link href={`/admin/create-product`}>
        <p className="m-4 text-xl "> + Create New Product</p>
      </Link>
      <div className="flex flex-row items-end justify-start gap-12">
        <VariationSelector
          variations={productCategories}
          heading="Category"
          currentVariation={category}
          setCurrentVariation={setCategory}
        />
        <AllProductFilters
          allProducts={products}
          setFilteredProducts={setFilteredProducts}
          category={category}
          isCategory={true}
        />
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id} className=" m-8 border-b-2 p-5">
            <div className="prouct flex flex-row">
              <Link href={`/admin/edit-product/${product.id}`}>
                <div>
                  <img src={product.images[0]} alt={product.name} width="150" />
                </div>
              </Link>
              <div className="flex flex-col m-4">
                <Link href={`/admin/edit-product/${product.id}`}>
                  <p className=" text-base-content text-semibold link">
                    {product.name}
                  </p>
                </Link>
                <p className="">Price: ${product.sale_price}</p>
                <p className="">Categories: {product.category}</p>
                <p className="">Tags: {product.tags.join(", ")}</p>
                <p>Product ID: {product.id}</p>
              </div>
              <Link href={`/product/${product.id}`}>
                <p className="m-4 text-xl "> → View Product</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;
