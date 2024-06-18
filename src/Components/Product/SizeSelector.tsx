
export const SizeSelector = ( {sizes, currentSize, setCurrentSize}:{sizes:string[], currentSize:string, setCurrentSize: (newSize: string) => void } ) => {



  return (
    <div className='flex flex-col mt-5'>
        <p className="font-semibold m-1">Select Size</p>
        <div className="sizes flex flex-row justify-start uppercase ">
         
            {sizes.map( (s) => <div key={s} onClick={ () => setCurrentSize(s) } 
            className={`px-6 py-4 m-2 w-auto text-base-content bg-base-200 hover:text-info-content hover:bg-neutral-content pointer cursor-pointer click:bg-base-300 
            ${ s === currentSize ? " outline outline-1 bg-base-100 " : ""} `}>{s}</div> )}
          
        </div>
        
    </div>
  )
}
