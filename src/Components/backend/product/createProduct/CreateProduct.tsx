import React, { useState } from "react";
import { InputBox } from "../../../Input/InputBox";
import { ButtonSquareRed } from "../../../BannerButton";
import { ProductAttributes, ProductInfo } from "../../../../types";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AttributeSelector from "./AttributeSelector";

const CreateProduct = () => {
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    id: 0,
    name: "",
    description: "",
    full_price: null,
    sale_price: null,
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

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const categories = [
    "Men",
    "Women",
    "Kids",
    "Pants",
    "Shirts",
    "Hats",
    "Dresses",
    "Tops",
    "Accessories",
    "Shoes",
    "T-Shirts",
    "Shorts",
  ];

  const [images, setImages] = useState<FileList | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCreateProduct = async () => {
    const { name, description, full_price, sale_price, sku } = productInfo;

    // if (
    //   !name ||
    //   !description ||
    //   full_price == null ||
    //   sale_price == null ||
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
        const filename = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `products/${filename}`);

        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }
    }

    const db = getFirestore();
    try {
      await addDoc(collection(db, "products"), {
        ...productInfo,
        full_price: productInfo.full_price - 0.03,
        sale_price: productInfo.sale_price - 0.03,
        images: imageUrls,
        sizes: selectedSizes,
        categories: selectedCategories,
        tags: selectedTags,
        created_at: new Date(),
        updated_at: new Date(),
        sold_to_date: 0,
        stock: 10,
      });
      alert("Product created successfully!");
      // Reset form fields
      setProductInfo({
        id: 0,
        name: "",
        description: "",
        full_price: null,
        sale_price: null,
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
        <InputBox
          type="text"
          placeholder="Name"
          value={productInfo.name}
          onChange={handleInputChange}
          name="name"
        />
        <InputBox
          type="text"
          placeholder="Description"
          value={productInfo.description}
          onChange={handleInputChange}
          name="description"
        />
        <div className="flex flex-col">
          <label className="ml-2 mt-4 font-semibold">Full Price: </label>
          <InputBox
            type="number"
            placeholder="Full Price"
            value={productInfo.full_price}
            onChange={handleInputChange}
            name="full_price"
          />
        </div>

        <div className="flex flex-col">
          <label className="ml-2 mt-4 font-semibold">Sale Price: </label>
          <InputBox
            type="number"
            placeholder="Sale Price"
            value={productInfo.sale_price}
            onChange={handleInputChange}
            name="sale_price"
          />
        </div>

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

        <InputBox
          type="text"
          placeholder="SKU"
          value={productInfo.sku}
          onChange={handleInputChange}
          name="sku"
        />
        <ButtonSquareRed label="Create Product" onClick={handleCreateProduct} />
      </div>
    </div>
  );
};

export default CreateProduct;
