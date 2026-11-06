import React from "react";
import Image from "next/image";

export const CollectionHeading = ({ header }: { header: string }) => {
  return (
    <div className="collection-heading flex justify-center relative paper-heading cursor-pointer">
      <h2 className="collections-heading text-white py-3 md:px-20 px-14 w-full rounded-md mx-5 relative leading-none bg-accent">
        <span className="relative z-20">
          {header?.replace("-", " ") || header}
        </span>
        <div className="w-full flex lg:justify-center">
          <Image
            src="/assets/origami-cat-inverted.png"
            alt="Foldy Friends Origami Cat"
            className="h-36 w-36 absolute transform -translate-y-1/2 md:left-0 -left-14 z-10 drop-shadow-lg"
            width={144}
            height={144}
          />
        </div>
      </h2>
    </div>
  );
};
