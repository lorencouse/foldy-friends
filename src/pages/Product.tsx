import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useShopContext } from '../context/ShopContext';
import { Prices } from '../components/Product/Prices';
import { SizeSelector } from '../components/Product/SizeSelector';
import { ButtonSquareRed } from '../components/BannerButton';
import { ProductImages } from '../components/Product/ProductImages';
import { Breadcrumbs } from '../components/Product/Breadcrumbs';
import { Collections } from '../components/ProductCategory/Collections';
import { StarRatingAverage } from '../components/Product/StarRating';
import { DescriptionBox } from '../components/Product/DescriptionBox';
import { shuffleProducts } from '../tools/ShuffleProducts';
import { useAddToCart } from '../hooks/UseAddToCart';

const Product = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { allProducts } = useShopContext();
  const handleAddToCart = useAddToCart();

  const description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor laudantium a at pariatur? Esse cum mollitia velit ipsam maxime hic, laborum eaque et id, tenetur, non corporis iure pariatur ab. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor laudantium a at pariatur? Esse cum mollitia velit ipsam maxime hic, laborum eaque et id, tenetur, non corporis iure pariatur ab. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor laudantium a at pariatur? Esse cum mollitia velit ipsam maxime hic, laborum eaque et id, tenetur, non corporis iure pariatur ab.";
  const sizes = ["s", "m", "l", "xl", "xxl"];
  const [currentSize, setCurrentSize] = useState<string>("m");

  const product = allProducts.find(i => i.id === Number(productId));

  const relatedProducts = useMemo(() => {
    return shuffleProducts(
      allProducts.filter(p => p.category === product?.category && p.id !== product?.id),
      4
    );
  }, [allProducts, product?.category, product?.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const image = `/Assets/product_${productId}.png`

  const images = [image, image, image, image];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='lg:mx-16 md:mx-12'>
      <div className='flex flex-row flex-wrap'>
        <ProductImages images={images} alt={product.name} />

        <div className="product-info lg:w-6/12 text-left p-5">
          <Breadcrumbs category={product.category} name={product.name} />
          <h1>{product.name}</h1>
          <StarRatingAverage id={product.id} />
          <Prices oldPrice={product.old_price} newPrice={product.new_price} />
          {/* <p className="short-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum eligendi voluptates impedit minima voluptas sed perferendis ut, dolores nisi animi rerum molestias. Nemo, hic! Deleniti enim exercitationem aliquam rerum numquam!</p> */}
          <SizeSelector currentSize={currentSize} setCurrentSize={setCurrentSize} sizes={sizes} />
          <ButtonSquareRed label='Add To Cart' onclick={() => handleAddToCart(product.id, currentSize)} />
          {product.category && (
            <>
              <p className=' capitalize '><span className='font-bold'>Categories:</span>  <Link href={`/category/${product.category}`}>{product.category}</Link> </p>
              <p className=' capitalize '><span className='font-bold'>Tags:</span>  <Link href={`/category/${product.category}`}>{product.category}</Link> </p>
            </>
          )}
        </div>
      </div>

      <DescriptionBox description={description} id={product.id} />
      <div className="related-Products">
        <Collections productData={relatedProducts} header='Related Products' />
      </div>
    </div>
  );
};

export default Product;