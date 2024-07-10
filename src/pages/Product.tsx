// src/pages/Product.tsx
import React, { useState } from "react";
import Link from "next/link";
import { Prices } from "../components/Product/Prices";
import { VariationSelector } from "../components/Product/VariantSelector";
import { ProductImages } from "../components/Product/ProductImages";
import { Breadcrumbs } from "../components/Product/Breadcrumbs";
import { Collections } from "../components/ProductCategory/Collections";
import { StarRatingAverage } from "../components/Product/Reviews/StarRating";
import { DescriptionBox } from "../components/Product/DescriptionBox";
import { AddToCartButton } from "../components/Product/AddToCartButton";
import { LoadingScreen } from "../components/Product/LoadingScreen";
import { ProductInfo } from "../types";

const Product = ({
  product,
  relatedProducts,
}: {
  product: ProductInfo;
  relatedProducts: ProductInfo[];
}) => {
  const [currentVariation, setCurrentVariation] = useState(
    product.variations?.[0] || "",
  );

  if (!product) {
    return <LoadingScreen />;
  }

  return (
    <div className="lg:mx-16 md:mx-12 my-8 fade-in">
      <div className="flex flex-row flex-wrap">
        <div className="product-images lg:w-5/12 md:w-8/12 lg:mr-8 mx-3">
          <ProductImages images={product.images} alt={product.name} />
        </div>
        <div className="product-info lg:w-6/12 text-left p-5">
          <Breadcrumbs category={product.category} name={product.name} />
          <h1 className="md:text-5xl text-4xl">{product.name}</h1>
          <StarRatingAverage id={product.id} />
          <Prices oldPrice={product.full_price} newPrice={product.sale_price} />
          {product.variations && (
            <VariationSelector
              currentVariation={currentVariation}
              heading="Variant"
              setCurrentVariation={setCurrentVariation}
              variations={product.variations}
            />
          )}
          <AddToCartButton product={product} variation={currentVariation} />
          {product.category && (
            <div>
              <div className="capitalize my-2">
                <span className="font-bold">Categories:</span>{" "}
                <Link
                  href={`/category/${product.category}`}
                  className="badge badge-primary badge-outline cursor-pointer hover:scale-105 duration-200"
                >
                  <span className="text-base-content cursor-pointer">
                    {product.category}
                  </span>
                </Link>{" "}
              </div>
              <div className="capitalize flex flex-row flex-wrap items-center">
                <span className="font-bold mr-2">Tags:</span>{" "}
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag ml-1 mb-1 cursor-pointer hover:scale-105 duration-200"
                  >
                    <Link
                      href={`/tag/${tag}`}
                      className="badge badge-secondary badge-outline"
                    >
                      <span className="text-base-content">{tag}</span>
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <DescriptionBox description={product.description} id={product.id} />
      <div className="related-Products mt-20">
        <Collections products={relatedProducts} header="Related Products" />
      </div>
    </div>
  );
};

export default Product;
