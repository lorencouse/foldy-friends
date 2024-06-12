import React from 'react'
import { ButtonRoundRed } from '../BannerButton'

export const Hero = () => {
  return (
    <div className='flex flex-row flex-wrap justify-around min-h-screen bg-gradient-to-t from-base-100 to-secondary-content'>
        <div className="flex flex-col items-center justify-center text-left mt-10">
            <div className='flex flex-col font-semibold' >
                <p>New Arrivals</p>
                <p className='banner-heading'>New <br/> Cute <br/> Looks</p>
            </div>
            <ButtonRoundRed label='Shop Now' url='/shop' />
        </div>
        <div className="hero-image">
            <img src='/Assets/hero_image.png' alt="Hero Model"  />
        </div>
        
    </div>
  )
}
