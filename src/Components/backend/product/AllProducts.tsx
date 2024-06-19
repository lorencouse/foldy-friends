import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  full_price: number;
  sale_price: number;
  images: string[];
  sizes: string[];
  categories: string[];
  tags: string[];
  sku: string;
}

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [db]);

  return (
    <div>
      <h1>All Products</h1>
      <Link href={`/admin/create-product`}>
        <p className="m-4 text-xl "> + Create New Product</p>
      </Link>
      <ul>
        {products.map((product) => (
          <li key={product.id} className=" m-8 border-b-2 p-5">
            <div className="prouct flex flex-row">
              <div>
                <img src={product.images[0]} alt={product.name} width="150" />
              </div>
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;
