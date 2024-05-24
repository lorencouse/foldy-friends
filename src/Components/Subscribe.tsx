import React from 'react'
import { BannerButtonBlack } from './BannerButton'

export const Subscribe = () => {
  return (
    <div className='banner-background flex flex-col justify-around' >
        <div className="subscribe-box my-12">
            <p className="banner-heading">Get in on Exclusive Offers</p>
            <p className='banner-sub-text' >Subscribe to stay up to date on our newest sales and hottest items</p>
            <form action="submit ">
                <input type="email" name="" id="" className='py-3 rounded-full  border-gray-400 w-11/12 lg:w-1/2 md:3/4 mx-4' />
                <button className='rounded-full w-48 bg-black p-3 text-white hover:bg-gray-500 my-5 -ml-52' >Subscribe</button>
            </form>

        </div>


    </div>
  )
}
