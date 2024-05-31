import React from 'react'
import image from '../../Assets/hero_image.png'
import { ButtonRoundRed } from '../BannerButton'

export const Hero = () => {
  return (
    <div className='flex flex-row flex-wrap justify-around min-h-screen banner-background'>
        <div className="flex flex-col items-center justify-center text-left mt-10">
            <div className='flex flex-col font-semibold' >
                <p>New Arrivals</p>
                <p className='banner-heading'>New <br/> Cute <br/> Looks</p>
            </div>
            <ButtonRoundRed label='Shop Now' url='' />
        </div>
        <div className="hero-image">
            <img src={image} alt="Hero Model"  />
        </div>
        
    </div>
  )
}
