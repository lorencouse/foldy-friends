
export const SizeSelector = ( {sizes, currentSize, setCurrentSize}:{sizes:string[], currentSize:string, setCurrentSize: (newSize: string) => void } ) => {



  return (
    <div className='flex flex-col mt-5'>
        <p className="font-semibold m-1">Select Size</p>
        <div className="sizes flex flex-row justify-start uppercase ">
         
            {sizes.map( (s) => <div onClick={ () => setCurrentSize(s) } 
            className={`px-6 py-4 m-2 w-auto bg-gray-100 hover:bg-gray-50 pointer cursor-pointer click:bg-gray-300 
            ${ s === currentSize ? " outline outline-1 bg-gray-50 " : ""} `}>{s}</div> )}
          
        </div>
        
    </div>
  )
}
