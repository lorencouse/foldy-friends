import React, { useState } from 'react'

export const SizeSelector = () => {

    const sizes = ["s", "m","l","xl","xxl",]
    const [current, setCurrent] = useState<number>(0);

  return (
    <div className='flex flex-col my-5'>
        <p>Select Size:</p>
        <div className="sizes flex flex-row justify-start uppercase ">
         
            {sizes.map( (s, index) => <div onClick={ current => setCurrent(index) } className={`px-6 py-4 m-2 w-auto bg-gray-100 hover:bg-gray-50 pointer cursor-pointer click:bg-gray-300 ${ index === current ? " outline outline-1 bg-gray-50 " : ""} `}>{s}</div> )}
          
        </div>
        
    </div>
  )
}
