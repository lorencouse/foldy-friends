import React from 'react'
import image from '../../Assets/hero_image.png'

export const Hero = () => {
  return (
    <div className='flex flex-row justify-around bg-gradient-to-b from-pink-200 to-white  h-screen font-semibold'>
        <div className="flex flex-col items-center justify-center text-left">
            <div className='flex flex-col' >
                <p>New Arrivals</p>
                <p className='text-6xl leading-snug  '>New <br/> Cute <br/> Animals</p>
                {/* <p className='text-6xl'>Cute</p>
                <p className='text-6xl'>Animals</p> */}
            </div>

            <button className='rounded-full w-48 bg-red-600 p-3 text-white hover:bg-red-500 my-10' >Shop Now</button>
        </div>
        <img src={image} alt="" />
    </div>
  )
}
