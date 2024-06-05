import React, { useState } from 'react'

export const ProductImages = ( {images, alt}:{images:string[], alt:string} ) => {
    const [currentImg, setCurrentImg] = useState<number>(0);

  return (
        <div className="product-images flex flex-row justify-start item m-3">

            <div className="image-gallery flex flex-col">
                { images.map( (image, i) => <img src={image} alt={alt} onClick={ currentImg => setCurrentImg(i) }  className={` w-20 m-1 hover:opacity-80 hover:scale-105 ${i === currentImg ? "opacity-80 scale-105" : ""}`}  /> )}
            </div>

            <div className="product-image mx-2">
                <img src={images[currentImg]} alt={alt} />
                {/* <p>{currentImg}</p> */}
            </div>

      </div>
  )
}
