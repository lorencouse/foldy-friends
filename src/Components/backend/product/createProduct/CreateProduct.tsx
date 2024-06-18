import React, { useState } from "react";
import { ButtonSquareRed } from "../../../BannerButton";
import { ProductInfo } from "../../../../types";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AttributeSelector from "./AttributeSelector";
import { ProductInfoInput } from "./productInfoInput";

const CreateProduct = () => {
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    id: "",
    name: "",
    description: "",
    full_price: "",
    sale_price: "",
    images: [],
    colors: [],
    categories: [],
    tags: [],
    reviews: [],
    created_at: new Date(),
    updated_at: new Date(),
    sold_to_date: 0,
    stock: 0,
    sku: "",
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const sizes = ["Red", "Blue", "Green", "Yellow", "Black", "White"];
  const categories = [
    "Paper",
    "Supplies",
    "Books",
    "Kits",
    "Amimals",
    "Hats",
    "Dresses",
    "Tops",
    "Accessories",
    "Shoes",
    "T-Shirts",
    "Shorts",
  ];

  const [images, setImages] = useState<FileList | null>(null);

  const handleCreateProduct = async () => {
    // const { name, description, full_price, sale_price, sku } = productInfo;

    // if (
    //   !name ||
    //   !description ||
    //   full_price === "" ||
    //   sale_price === "" ||
    //   selectedSizes.length === 0 ||
    //   selectedCategories.length === 0 ||
    //   selectedTags.length === 0 ||
    //   !sku
    // ) {
    //   alert("Please fill in all fields.");
    //   return;
    // }

    const imageUrls: string[] = [];
    const storage = getStorage();

    if (images) {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const filename = `${Date.now()}-${productInfo.name}-${i + 1}`;
        const storageRef = ref(storage, `product-images/${filename}`);

        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }
    }

    const db = getFirestore();
    try {
      await addDoc(collection(db, "products"), {
        ...productInfo,
        id: new UUID(),
        images: imageUrls,
        sizes: selectedSizes,
        categories: selectedCategories,
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
      setProductInfo({
        id: "",
        name: "",
        description: "",
        full_price: "",
        sale_price: "",
        images: [],
        sizes: [],
        categories: [],
        tags: [],
        reviews: [],
        created_at: new Date(),
        updated_at: new Date(),
        sold_to_date: 0,
        stock: 0,
        sku: "",
      });
      setSelectedCategories([]);
      setSelectedTags([]);
      setSelectedSizes([]);
      setImages(null);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-6">
      <h1>Create New Product</h1>
      <div className="customer-information flex flex-col">
        <ProductInfoInput
          productInfo={productInfo}
          setProductInfo={setProductInfo}
        />

        <div className="flex flex-col">
          <label className="ml-2 mt-4 font-semibold">Images: </label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="max-w-96 border border-gray-300 rounded-md mb-2 p-2"
          />
        </div>
        <AttributeSelector
          attributes={sizes}
          heading="Sizes"
          selectedAttributes={selectedSizes}
          setSelectedAttributes={setSelectedSizes}
        />
        <AttributeSelector
          attributes={categories}
          heading="Categories"
          selectedAttributes={selectedCategories}
          setSelectedAttributes={setSelectedCategories}
        />
        <AttributeSelector
          attributes={categories}
          heading="Tags"
          selectedAttributes={selectedTags}
          setSelectedAttributes={setSelectedTags}
        />

        <ButtonSquareRed label="Create Product" onClick={handleCreateProduct} />
      </div>
    </div>
  );
};

export default CreateProduct;
