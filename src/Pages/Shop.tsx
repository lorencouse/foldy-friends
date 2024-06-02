import React, { useMemo, useState } from 'react'
import { CategoryCard } from '../Components/ProductCategory/CategoryCard'
import { Collections } from '../Components/ProductCategory/Collections'
import { filterProductCategory, shuffleProducts } from '../Tools/ShuffleProducts'
import { useShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
import { ProductData } from '../types'
import {  AllProductFilters } from '../Components/ProductCategory/ProductFilters'

export const Shop = () => {
    const { setActiveCategory, allProducts } = useShopContext();
    const [filteredProducts, setFilteredProducts] = useState<ProductData[]>(allProducts);
    const categories = useMemo(() => ["men", "women", "kids"], []); 


    const topSellers = useMemo(() => {
        return categories.map(category => ({
            category,
            products: shuffleProducts(filterProductCategory(allProducts, category), 4)
        }));
    }, [allProducts, categories]);

    return (
        <div className="shop-container">
            <h2 className='my-8'>Explore All Categories</h2>
            <div className='categories flex flex-row justify-around border border-b-1 border-t-0 my-8'>
                {categories.map(category => (
                    <CategoryCard key={category} category={category} />
                ))}
            </div>

            <div className="top-sellers">
                {topSellers.map(({ category, products }) => (
                    <React.Fragment key={category}>
                        <Collections productData={products} header={category} />
                        <Link to={`/${category}`}>
                            <p className='capitalize underline text-lg font-semibold hover:text-red-500 border border-b-1 border-t-0 pb-16'
                               onClick={() => { setActiveCategory(category); window.scrollTo(0, 0); }}>
                                View All {`${category}'s Ware`}
                            </p>
                        </Link>
                    </React.Fragment>
                ))}
            </div>

            <div className="all-products ">
              <h2 className='my-10 text-5xl font-semibold'>All Products</h2>
                

                <AllProductFilters categories={categories} products={allProducts} setFilteredProducts={setFilteredProducts} />

             
                <Collections productData={filteredProducts} header='' />
            </div>
        </div>
    );
};
