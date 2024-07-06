import React, { useState } from "react";

export const ProductImages = ({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) => {
  const [currentImg, setCurrentImg] = useState<number>(0);

  return (
    <div className="product-images flex flex-row justify-start items-start mb-3">
      <div className="image-gallery flex flex-col max-h-96 overflow-scroll w-1/6">
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={alt}
            onClick={() => setCurrentImg(i)}
            className={`gallery-image max-w-20 h-auto m-1  hover:opacity-80 hover:scale-105 ${i === currentImg ? "opacity-80 scale-105" : ""}`}
          />
        ))}
      </div>

      <div className="product-image mx-3 paper md:w-5/6 w-9/12">
        <div className="tape-section"></div>
        <img className="w-96 " src={images[currentImg]} alt={alt} />
        <div className="tape-section"></div>
      </div>
    </div>
  );
};
