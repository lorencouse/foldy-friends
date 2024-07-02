import React from 'react';

export const Prices = ({ oldPrice, newPrice }: { oldPrice?: number; newPrice?: number }) => {
  return (
    <div className="prices flex flex-row my-3 items-end ">
      <div className="sale-price font-bold text-secondary text-xl">
        {newPrice !== undefined ? `$${newPrice}` : 'N/A'}
      </div>
      <div className="retail-price mx-3 font-extralight line-through ">
        {oldPrice !== undefined ? `$${oldPrice}` : 'N/A'}
      </div>
    </div>
  );
};
