import React, { useState, useEffect } from 'react';
import { useShopContext } from '../Context/ShopContext';
import { Link, useParams } from 'react-router-dom';
import { Prices } from '../Components/Product/Prices';
import { SizeSelector } from '../Components/Product/SizeSelector';
import { ButtonSquareRed } from '../Components/BannerButton';
import { ProductImages } from '../Components/Product/ProductImages';
import { Breadcrumbs } from '../Components/Product/Breadcrumbs';
import { Collections } from '../Components/Collections';
import { CartItem } from '../types';
import { StarRatingAverage } from '../Components/Product/StarRating';
import { DescriptionBox } from '../Components/Product/DescriptionBox';
import { shuffleProducts } from '../Tools/ShuffleProducts';


export const Product: React.FC = () => {

  const { productId } = useParams();
  const { allProducts, cartItems, setCartItems, setCartCount} = useShopContext();
  const sizes = ["s", "m","l","xl","xxl",]
  const description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor laudantium a at pariatur? Esse cum mollitia velit ipsam maxime hic, laborum eaque et id, tenetur, non corporis iure pariatur ab. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor laudantium a at pariatur? Esse cum mollitia velit ipsam maxime hic, laborum eaque et id, tenetur, non corporis iure pariatur ab. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor laudantium a at pariatur? Esse cum mollitia velit ipsam maxime hic, laborum eaque et id, tenetur, non corporis iure pariatur ab."
  const [currentSize, setCurrentSize] = useState<number>(0);

  const product = allProducts.find(i => i.id === Number(productId));


  const relatedProducts = allProducts.filter(p => p.category === product?.category && p.id !== product?.id);
  


  useEffect(() => {
    window.scrollTo(0,0)

  },[productId]);

  const images = product?.image ? [product.image, product.image, product.image, product.image] : []; 


    
    const randomRelatedProducts = shuffleProducts(relatedProducts, 4);

  if (!product) {
    return <div>Product not found</div>;
  }

function handleAddToCart() {
  const cartItem: CartItem = { id: Number(productId), quantity: 1, size: sizes[currentSize] };

  if (!cartItems.some((item) => item.id === cartItem.id && item.size === cartItem.size)) {
    setCartItems(oldCartItems => [...oldCartItems, cartItem]);
  } else {
    setCartItems(oldCartItems =>
      oldCartItems.map(item =>
        item.id === cartItem.id && item.size === cartItem.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  setCartCount( oldCount => oldCount + 1 );
  
}

  return (
    <div className='lg:mx-16 md:mx-12'>
    <div className='flex flex-row flex-wrap  '>

      <ProductImages images={images} alt={product.name} />

      <div className="product-info lg:w-6/12 text-left p-5">

        <Breadcrumbs category={product.category} name={product.name} />
        <h1>{product.name}</h1>
        <StarRatingAverage id={product.id} />
        <Prices oldPrice={product.old_price} newPrice={product.new_price} />
        <p className="short-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum eligendi voluptates impedit minima voluptas sed perferendis ut, dolores nisi animi rerum molestias. Nemo, hic! Deleniti enim exercitationem aliquam rerum numquam!</p>
        <SizeSelector currentSize={currentSize} setCurrentSize={setCurrentSize} sizes={sizes} />
        <ButtonSquareRed label='Add To Cart' onclick={ handleAddToCart } />

        <p className=' capitalize '><span className='font-bold'>Categories:</span>  <Link to={`/${product.category}`}>{product.category}</Link> </p>
        <p className=' capitalize '><span className='font-bold'>Tags:</span>  <Link to={`/${product.category}`}>{product.category}</Link> </p>

      </div>


    </div>

    <DescriptionBox description={description} id={product.id} />
    <div className="related-Products" >
      <Collections productData={randomRelatedProducts} header='Related Products' />
    </div>

  

    </div>
  );
}
