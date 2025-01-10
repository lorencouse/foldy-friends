"use client";

import React, { useState, useEffect } from "react";
import { ButtonSquareRed } from "@/components/BannerButton";
import { Product } from "@/types";
import { CheckSvg } from "@/components/svgPaths";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import AttributeSelector from "@/components/backend/product/createProduct/AttributeSelector";
import { ProductInfoInput } from "@/components/backend/product/createProduct/ProductInfoInput";
import {
  emptyProduct,
  productCategories,
  productTags,
  productVariations,
} from "@/data/constants";
import Link from "next/link";
import { VariationSelector } from "@/components/Product/VariantSelector";

const CreateProduct = ({ product }: { product: Product | null }) => {
  const [productInfo, setProductInfo] = useState<Product>(emptyProduct);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>(null);

  useEffect(() => {
    if (product) {
      console.log("Loading existing product:", product);
      setProductInfo(product);
      setSelectedCategory(product.category);
      setSelectedTags(product.tags);
      setSelectedVariations(product.variations);
    }
  }, [product]);

  const handleSaveProduct = async () => {
    const imageUrls: string[] = [...productInfo.images];
    const storage = getStorage();

    const resizeImage = (file: File, height: number): Promise<Blob> => {
      return new Promise((resolve, reject) => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const canvas = document.createElement("canvas");
          canvas.height = height;
          canvas.width = height * aspectRatio;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Canvas is empty"));
            }
          }, file.type);
        };
        img.onerror = (err) => {
          reject(err);
        };
      });
    };

    if (images) {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const filename = `${Date.now()}-${productInfo.name}-${i + 1}`;
        const storageRef = ref(storage, `product-images/${filename}`);

        // Resize the image
        const resizedImageBlob = await resizeImage(file, 500);

        // Upload the resized image
        await uploadBytes(storageRef, resizedImageBlob);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }
    }

    const db = getFirestore();
    try {
      if (product) {
        // Update existing product
        const productRef = doc(db, "products", product.id);
        await updateDoc(productRef, {
          ...productInfo,
          name: productInfo.name,
          description: productInfo.description,
          full_price: productInfo.full_price,
          sale_price: productInfo.sale_price,
          images: imageUrls,
          variations: selectedVariations,
          category: selectedCategory,
          tags: selectedTags,
          updated_at: new Date(),
        });
        alert("Product updated successfully!");
      } else {
        // Create new product
        const docRef = await addDoc(collection(db, "products"), {
          ...productInfo,
          full_price:
            productInfo.full_price !== undefined
              ? productInfo.full_price - 0.01
              : null,
          sale_price:
            productInfo.sale_price !== undefined
              ? productInfo.sale_price - 0.03
              : null,
          images: imageUrls,
          variations: selectedVariations,
          category: selectedCategory,
          tags: selectedTags,
          created_at: new Date(),
          updated_at: new Date(),
          sold_to_date: 0,
          stock: 10,
        });
        await updateDoc(doc(db, "products", docRef.id), {
          id: docRef.id,
        });
        alert("Product created successfully!");
        // Reset form fields
        setProductInfo(emptyProduct);
        setSelectedCategory("");
        setSelectedTags([]);
        setSelectedVariations([]);
        setImages(null);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDeleteImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(e.currentTarget.dataset.index || "0", 10);
    const imageUrl = productInfo.images[index];

    if (!imageUrl) {
      console.error("Image URL not found");
      return;
    }

    const imageName = decodeURIComponent(
      imageUrl.split("/").pop()?.split("?")[0] || "",
    );

    if (!imageName) {
      console.error("Invalid image name");
      return;
    }

    const storage = getStorage();
    const imageRef = ref(storage, `${imageName}`);
    console.log(imageName);

    try {
      await deleteObject(imageRef);
      const updatedImages = productInfo.images.filter((_, i) => i !== index);
      const db = getFirestore();
      const productRef = doc(db, "products", productInfo.id);
      await updateDoc(productRef, {
        images: updatedImages,
      });
      setProductInfo((prevInfo) => ({
        ...prevInfo,
        images: updatedImages,
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages((prevImages) => {
        const newFiles = prevImages
          ? Array.from(prevImages).concat(fileArray)
          : fileArray;
        const dataTransfer = new DataTransfer();
        newFiles.forEach((file) => dataTransfer.items.add(file));
        return dataTransfer.files;
      });
    }
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-6">
      <h1>{product ? "Edit Product" : "Create New Product"}</h1>
      {product && (
        <div className="flex flex-row flex-wrap">
          <Link href={`/admin/create-product`}>
            <p className="m-4 text-xl "> + Create New Product</p>
          </Link>
          <Link href={`/product/${product.id}`}>
            <p className="m-4 text-xl "> → View Product</p>
          </Link>
        </div>
      )}
      <Link href="/admin/all-products">
        <p className="m-4 text-xl "> ← Back to All Products</p>
      </Link>

      <div className="create-product-information flex flex-col">
        {productInfo.images.length > 0 && (
          <div className="flex flex-col">
            <label className="ml-2 mt-4 font-semibold">Current Images: </label>
            <div className="flex flex-row">
              {productInfo.images.map((image, index) => (
                <div key={index} className="flex flex-col items-center">
                  <button
                    data-index={index}
                    onClick={handleDeleteImage}
                    className="text-red-500"
                  >
                    x
                  </button>
                  <img
                    src={image}
                    alt={productInfo.name}
                    width="100"
                    className="m-2"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <ProductInfoInput
          productInfo={productInfo}
          setProductInfo={setProductInfo}
        />

        <div className="flex flex-col">
          <label className="ml-2 mt-4 font-semibold">Images: </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="max-w-96 border border-gray-300 rounded-md mb-2 p-2"
          />
        </div>

        <AttributeSelector
          attributes={productVariations}
          heading="Variations"
          selectedAttributes={selectedVariations}
          setSelectedAttributes={setSelectedVariations}
        />
        <VariationSelector
          variations={productCategories}
          heading="Category"
          currentVariation={selectedCategory}
          setCurrentVariation={setSelectedCategory}
        />
        <AttributeSelector
          attributes={productTags}
          heading="Tags"
          selectedAttributes={selectedTags}
          setSelectedAttributes={setSelectedTags}
        />

        <ButtonSquareRed
          label={product ? "Update Product" : "Create Product"}
          onClick={handleSaveProduct}
          icon={CheckSvg}
        />
      </div>
    </div>
  );
};

export default CreateProduct;
