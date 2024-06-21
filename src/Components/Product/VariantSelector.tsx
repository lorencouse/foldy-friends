export const VariationSelector = ({
  variations,
  heading,
  currentVariation,
  setCurrentVariation,
}: {
  variations: string[];
  heading: string;
  currentVariation: string;
  setCurrentVariation: (newSize: string) => void;
}) => {

  if (variations.length === 0) return null;
  

  return (
    
    <div className="flex flex-col mt-5">
      <p className="font-semibold m-1">Select {heading}</p>
      <div className="variations flex flex-row justify-start capitalize ">
        {variations.map((s) => (
          <div
            key={s}
            onClick={() => setCurrentVariation(s)}
            className={`px-6 py-4 m-2 w-auto text-base-content bg-base-200 hover:text-info-content hover:bg-neutral-content pointer cursor-pointer click:bg-base-300 
            ${s === currentVariation ? " outline outline-1 bg-base-100 " : ""} `}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};
