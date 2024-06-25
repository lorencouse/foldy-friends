import React, { useState, useEffect } from "react";
import { ButtonSquareRed } from "../../../BannerButton";
import { ProductInfo } from "../../../../types";

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
import AttributeSelector from "./AttributeSelector";
import { ProductInfoInput } from "./productInfoInput";
import {
  emptyProduct,
  productCategories,
  productTags,
  productVariations,
} from "../../../../data/constants";
import Link from "next/link";
import { VariationSelector } from "../../../Product/VariantSelector";

const CreateProduct = ({ existingProduct }) => {
  const [productInfo, setProductInfo] = useState<ProductInfo>(emptyProduct);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>(null);

  useEffect(() => {
    if (existingProduct) {
      console.log("Loading existing product:", existingProduct);
      setProductInfo(existingProduct);
      setSelectedCategory(existingProduct.category);
      setSelectedTags(existingProduct.tags);
      setSelectedVariations(existingProduct.variations);
    }
  }, [existingProduct]);

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
      if (existingProduct) {
        // Update existing product
        const productRef = doc(db, "products", existingProduct.id);
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
          full_price: productInfo.full_price - 0.01,
          sale_price: productInfo.sale_price - 0.03,
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
    const imageName = decodeURIComponent(
      imageUrl.split("/").pop().split("?")[0],
    );
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
      setImages((prevImages) =>
        prevImages ? [...prevImages, ...e.target.files] : e.target.files,
      );
    }
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-6">
      <h1>{existingProduct ? "Edit Product" : "Create New Product"}</h1>
      {existingProduct && (
        <div className="flex flex-row flex-wrap">
          <Link href={`/admin/create-product`}>
            <p className="m-4 text-xl "> + Create New Product</p>
          </Link>
          <Link href={`/product/${existingProduct.id}`}>
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
          label={existingProduct ? "Update Product" : "Create Product"}
          onClick={handleSaveProduct}
        />
      </div>
    </div>
  );
};

export default CreateProduct;
