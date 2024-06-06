import React, { useState } from 'react';
import { InputBox } from '../../InputBox';
import { ButtonSquareRed } from '../../BannerButton';
import { supabase } from '../../../lib/supabaseClient';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fullPrice, setFullPrice] = useState<number | ''>('');
  const [salePrice, setSalePrice] = useState<number | ''>('');
  const [images, setImages] = useState<FileList | null>(null);
  const [sizes, setSizes] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [sku, setSku] = useState<string>('');

  const handleCreateProduct = async () => {
    if (!name || !description || !fullPrice || !salePrice || !images || sizes.length === 0 || categories.length === 0 || tags.length === 0 || !sku) {
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
          name,
          description,
          full_price: fullPrice,
          sale_price: salePrice,
          images: imageUrls,
          sizes,
          categories,
          tags,
          reviews: [],
          created_at: new Date(),
          updated_at: new Date(),
          sold_to_date: 0,
          stock: 10,
          sku,
        },
      ])
      .single();

    if (error) {
      console.error('Error creating product:', error);
    } else {
      alert('Product created successfully!');
      // Reset form fields
      setName('');
      setDescription('');
      setFullPrice('');
      setSalePrice('');
      setImages(null);
      setSizes([]);
      setCategories([]);
      setTags([]);
      setSku('');
    }
  };

  const handleMultiInputChange = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.split(',').map((item) => item.trim()));
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-6">
      <h1>Create New Product</h1>
      <div className="customer-information flex flex-col">
        <InputBox type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <InputBox type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <InputBox type='number' placeholder='Full Price' value={fullPrice} onChange={(e) => setFullPrice(Number(e.target.value))} />
        <InputBox type='number' placeholder='Sale Price' value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} />
        <input type="file" multiple onChange={(e) => setImages(e.target.files)} className='max-w-96 border border-gray-300 rounded-md mb-2 p-2' />
        <InputBox type='text' placeholder='Sizes (comma separated)' value={sizes.join(', ')} onChange={handleMultiInputChange(setSizes)} />
        <InputBox type='text' placeholder='Categories (comma separated)' value={categories.join(', ')} onChange={handleMultiInputChange(setCategories)} />
        <InputBox type='text' placeholder='Tags (comma separated)' value={tags.join(', ')} onChange={handleMultiInputChange(setTags)} />
        <InputBox type='text' placeholder='SKU' value={sku} onChange={(e) => setSku(e.target.value)} />
        <ButtonSquareRed label='Create Product' onClick={handleCreateProduct} />
      </div>
    </div>
  );
};

export default CreateProduct;
