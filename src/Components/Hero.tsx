import React from 'react'
import image from '../Assets/hero_image.png'
import { BannerButtonRed } from './BannerButton'

export const Hero = () => {
  return (
    <div className='flex flex-row flex-wrap justify-around h-screen banner-background'>
        <div className="flex flex-col items-center justify-center text-left ">
            <div className='flex flex-col font-semibold' >
                <p>New Arrivals</p>
                <p className='banner-heading'>New <br/> Cute <br/> Animals</p>
                {/* <p className='text-6xl'>Cute</p>
                <p className='text-6xl'>Animals</p> */}
            </div>
            <BannerButtonRed label='Shop Now' url='' />
        </div>
        <img src={image} alt="" />
    </div>
  )
}
