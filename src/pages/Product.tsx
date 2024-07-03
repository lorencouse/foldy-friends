import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useShopContext } from "../context/ShopContext";
import { Prices } from "../components/Product/Prices";
import { VariationSelector } from "../components/Product/VariantSelector";
import { ProductImages } from "../components/Product/ProductImages";
import { Breadcrumbs } from "../components/Product/Breadcrumbs";
import { Collections } from "../components/ProductCategory/Collections";
import { StarRatingAverage } from "../components/Product/Reviews/StarRating";
import { DescriptionBox } from "../components/Product/DescriptionBox";
import { shuffleProducts } from "../tools/ProductFilterFunctions";
import { AddToCartButton } from "../components/Product/AddToCartButton";
import { LoadingScreen } from "../components/Product/LoadingScreen";

const Product = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { allProducts, setShowMiniCart } = useShopContext();
  const [product, setProduct] = useState(null);
  const [currentVariation, setCurrentVariation] = useState("");

  useEffect(() => {
    if (productId && allProducts.length > 0) {
      const foundProduct = findProduct(productId);
      setProduct(foundProduct);
    }
  }, [productId, allProducts]);

  const findProduct = (id) => {
    const product = allProducts.find((p) => p.id === id);
    setCurrentVariation(product?.variations?.[0] || "");
    return product;
  };

  const relatedProducts = useMemo(() => {
    return shuffleProducts(
      allProducts.filter(
        (p) => p.category === product?.category && p.id !== product?.id,
      ),
      4,
    );
  }, [allProducts, product?.category, product?.id]);

  if (!product) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="lg:mx-16 md:mx-12 my-8 "
      onClick={() => setShowMiniCart(false)}
    >
      <div className="flex flex-row flex-wrap">
        <ProductImages images={product.images} alt={product.name} />

        <div className="product-info lg:w-6/12 text-left p-5">
          <Breadcrumbs category={product.category} name={product.name} />
          <Link href={`/admin/edit-product/${product.id}`}>
            <p className=" text-base-content text-semibold link mt-4 font-bold">
              - Edit Product -
            </p>
          </Link>
          <h1 className="leading-tight">{product.name}</h1>
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

          <AddToCartButton id={product.id} size={currentVariation} />
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
      <div className="related-Products">
        <Collections productData={relatedProducts} header="Related Products" />
      </div>
    </div>
  );
};

export default Product;
