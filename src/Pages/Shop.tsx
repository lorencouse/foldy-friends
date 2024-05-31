import React, { useMemo, useState } from 'react'
import { CategoryCard } from '../Components/CategoryCard'
import { Collections } from '../Components/Collections'
import { filterProductCategory, filterProductPrice, shuffleProducts } from '../Tools/ShuffleProducts'
import { useShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
import { ProductData } from '../types'

export const Shop = () => {
    const { setActiveCategory, allProducts } = useShopContext();
    const [filteredProducts, setFilteredProducts] = useState<ProductData[]>(allProducts);
    const [ priceFilter, setPriceFilter ] = useState<{min:number, max:number}>({min:0, max:100})

    const categories = useMemo(() => ["men", "women", "kids"], []); 

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        if (selectedCategory === "all") {
            setFilteredProducts(allProducts);
        } else {
            setFilteredProducts(filterProductCategory(allProducts, selectedCategory));
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setPriceFilter( p => ({...p, min: Number(value)}))

      setFilteredProducts( filterProductPrice(filteredProducts, priceFilter.min, 200));

    }

    // Memoize the top-sellers products
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
                <div className="sort-by flex justify-center items-center gap-4 ">
                  
                    <p className='font-bold text-lg'>Sort By:</p>


                    <select name="categories" id="categories" onChange={handleCategoryChange} className="p-2 border rounded capitalize font-bold bg-gray-100">
                        <option value="all">Category</option>
                        {categories.map(category => (
                            <option key={category} value={category} >
                                {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>

                    <input type="number" value={priceFilter.min} onChange={ handlePriceChange } />


                </div>
                <Collections productData={filteredProducts} header='' />
            </div>
        </div>
    );
};
