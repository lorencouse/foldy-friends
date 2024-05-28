import React from 'react'

export const Prices = ( {oldPrice, newPrice}:{oldPrice:number, newPrice:number } ) => {
  return (
          <div className="prices flex flex-row my-3">
            <div className="sale-price font-bold text-rose-600">
                {`$${newPrice}`}
            </div>
            <div className="retail-price mx-3 font-extralight line-through">
                 {`$${oldPrice}`}
            </div>
        </div>
  )
}
