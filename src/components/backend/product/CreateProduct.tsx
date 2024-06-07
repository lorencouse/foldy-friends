import React, { useState } from 'react';
import { InputBox } from '../../Input/InputBox';
import { ButtonSquareRed } from '../../BannerButton';
import { supabase } from '../../../lib/supabaseClient';
import { ProductInfo } from '../../../types';

const CreateProduct = () => {
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    id: 0,
    name: '',
    description: '',
    full_price: 0,
    sale_price: 0,
    images: [],
    sizes: [],
    categories: [],
    tags: [],
    reviews: [],
    created_at: new Date(),
    updated_at: new Date(),
    sold_to_date: 0,
    stock: 0,
    sku: '',
  });

  const [images, setImages] = useState<FileList | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleMultiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value.split(',').map((item) => item.trim()),
    }));
  };

  const handleCreateProduct = async () => {
    const { name, description, full_price, sale_price, sizes, categories, tags, sku } = productInfo;
    
    if (!name || !description || !full_price || !sale_price || !images || sizes.length === 0 || categories.length === 0 || tags.length === 0 || !sku) {
      alert('Please fill in all fields.');
      return;
    }

    const imageUrls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const filename = `${Date.now()}-${file.name}`;
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        imageUrls.push(data.url);
      } else {
        console.error('Error uploading image:', data.error);
        return;
      }
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          ...productInfo,
          images: imageUrls,
          created_at: new Date(),
          updated_at: new Date(),
          sold_to_date: 0,
          stock: 10,
        },
      ])
      .single();

    if (error) {
      console.error('Error creating product:', error);
    } else {
      alert('Product created successfully!');
      // Reset form fields
      setProductInfo({
        id: 0,
        name: '',
        description: '',
        full_price: 0,
        sale_price: 0,
        images: [],
        sizes: [],
        categories: [],
        tags: [],
        reviews: [],
        created_at: new Date(),
        updated_at: new Date(),
        sold_to_date: 0,
        stock: 0,
        sku: '',
      });
      setImages(null);
    }
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-6">
      <h1>Create New Product</h1>
      <div className="customer-information flex flex-col">
        <InputBox
          type='text'
          placeholder='Name'
          value={productInfo.name}
          onChange={handleInputChange}
          name='name'
        />
        <InputBox
          type='text'
          placeholder='Description'
          value={productInfo.description}
          onChange={handleInputChange}
          name='description'
        />
        <InputBox
          type='number'
          placeholder='Full Price'
          value={productInfo.full_price}
          onChange={handleInputChange}
          name='full_price'
        />
        <InputBox
          type='number'
          placeholder='Sale Price'
          value={productInfo.sale_price}
          onChange={handleInputChange}
          name='sale_price'
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className='max-w-96 border border-gray-300 rounded-md mb-2 p-2'
        />
        <InputBox
          type='text'
          placeholder='Sizes (comma separated)'
          value={productInfo.sizes.join(', ')}
          onChange={handleMultiInputChange}
          name='sizes'
        />
        <InputBox
          type='text'
          placeholder='Categories (comma separated)'
          value={productInfo.categories.join(', ')}
          onChange={handleMultiInputChange}
          name='categories'
        />
        <InputBox
          type='text'
          placeholder='Tags (comma separated)'
          value={productInfo.tags.join(', ')}
          onChange={handleMultiInputChange}
          name='tags'
        />
        <InputBox
          type='text'
          placeholder='SKU'
          value={productInfo.sku}
          onChange={handleInputChange}
          name='sku'
        />
        <ButtonSquareRed label='Create Product' onClick={handleCreateProduct} />
      </div>
    </div>
  );
};

export default CreateProduct;
