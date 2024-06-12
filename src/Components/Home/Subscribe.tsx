import React from 'react'

export const Subscribe = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-gradient-to-t from-base-100 to-secondary-content' >
        <div className="subscribe-box my-12 ">
            <p className="banner-heading">Get in on Exclusive Offers</p>
            <form action="submit">
                <input type="email" name="" id="" className='py-3 rounded-full  border-gray-400 w-11/12 md:3/4 mx-4 my-8 pl-6' />
                <button className='rounded-full w-48 bg-black p-3 text-white hover:bg-gray-500 my-5 -ml-52' >Subscribe</button>
            </form>
            <p className='banner-sub-text' >Subscribe to stay up to date on our newest sales and hottest items</p>


        </div>


    </div>
  )
}
