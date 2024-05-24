import React from 'react'
import offersImage from "../Assets/exclusive_image.png"
import { BannerButtonRed } from './BannerButton'

export const Offers = () => {
  return (
    <div className='flex flex-row lg:w-10/12 h-3/6 m-auto justify-around items-center banner-background'>
        <div className="offers-left justify-start items-start text-left p-10">
            <p className="banner-heading">
                Exclusive Offers <br />
                For You
            </p>
            <p className='banner-sub-text' >Great prices on our best selling items</p>
            <BannerButtonRed label='Shop Now' url='' />
        </div>
        <div className="offers-right">
            <img src={offersImage} alt="" />
        </div>

    </div>
  )
}
