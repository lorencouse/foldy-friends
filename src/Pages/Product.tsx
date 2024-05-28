import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link, useParams } from 'react-router-dom';
import { Prices } from '../Components/Product/Prices';
import { SizeSelector } from '../Components/Product/SizeSelector';
import { ButtonSquareRed } from '../Components/BannerButton';
import { ProductImages } from '../Components/Product/ProductImages';
import { Breadcrumbs } from '../Components/Product/Breadcrumbs';
import { Collections } from '../Components/Collections';
import { ProductData } from '../types';

export const Product: React.FC = () => {
  const shopContext = useContext(ShopContext);
  const { productId } = useParams();
  

  useEffect(() => {
    window.scrollTo(0,0)
  },[productId])

  if (!shopContext) {
    return <div>Loading...</div>;
  }

  const { allProducts, cartItems, setCartItems } = shopContext;
  
  const product = allProducts.find(i => i.id === Number(productId));
  const relatedProducts = allProducts.filter(p => p.category === product?.category && p.id !== product?.id);
    const shuffleArray = (array: ProductData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

    shuffleArray(relatedProducts);
    const randomRelatedProducts = relatedProducts.slice(0, 4);

  if (!product) {
    return <div>Product not found</div>;
  }

  const images = [product.image, product.image, product.image, product.image]; 

  return (
    <div className='lg:mx-16 md:mx-12'>
    <div className='flex flex-row flex-wrap  '>

      <ProductImages images={images} alt={product.name} />

      <div className="product-info lg:w-6/12 text-left p-5">

        <Breadcrumbs category={product.category} name={product.name} />
        <h1>{product.name}</h1>

        <Prices oldPrice={product.old_price} newPrice={product.new_price} />
        <p className="product-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum eligendi voluptates impedit minima voluptas sed perferendis ut, dolores nisi animi rerum molestias. Nemo, hic! Deleniti enim exercitationem aliquam rerum numquam!</p>
        <SizeSelector />
        <ButtonSquareRed label='Add To Cart' onclick={ () => setCartItems(prevCartItems => [...prevCartItems, product.id] ) } />

        <p className=' capitalize '><span className='font-bold'>Categories:</span>  <Link to={`/${product.category}`}>{product.category}</Link> </p>
        <p className=' capitalize '><span className='font-bold'>Tags:</span>  <Link to={`/${product.category}`}>{product.category}</Link> </p>

      </div>


    </div>

    <div className="related-Products" >
      <Collections productData={randomRelatedProducts} header='Related Products' />
    </div>

  

    </div>
  );
}
