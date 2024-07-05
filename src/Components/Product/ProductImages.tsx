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
    <div className="product-images flex flex-row justify-start items-start m-3">
      <div className="image-gallery flex flex-col max-h-96 overflow-scroll">
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={alt}
            onClick={() => setCurrentImg(i)}
            className={`gallery-image w-20 m-1 rounded-lg hover:opacity-80 hover:scale-105 ${i === currentImg ? "opacity-80 scale-105" : ""}`}
          />
        ))}
      </div>

      <div className="product-image mx-4 paper">
        <div className="tape-section"></div>
        <img className="w-96 " src={images[currentImg]} alt={alt} />
        <div className="tape-section"></div>
      </div>
    </div>
  );
};
