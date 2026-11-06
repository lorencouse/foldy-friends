import React from "react";

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

  // Define a mapping of variation names to Tailwind CSS background color classes
  const variationColorMap: { [key: string]: string } = {
    red: "bg-red-400 text-white",
    blue: "bg-blue-400 text-white",
    green: "bg-green-400 text-white",
    yellow: "bg-yellow-400 text-black",
    purple: "bg-purple-400 text-white",
    white: "bg-white text-black text-black",
    black: "bg-black text-white",
  };

  const getBgColorClass = (variation: string) => {
    return variationColorMap[variation.toLowerCase()] || "bg-gray-400";
  };

  return (
    <div className="flex flex-col mt-5">
      <p className="font-semibold my-4 ml-1 text-lg ">Select {heading}:</p>
      <div className="variations flex flex-row flex-wrap justify-start capitalize font-medium ">
        {variations.map((s) => (
          <div
            key={s}
            onClick={() => setCurrentVariation(s)}
            className={`px-6 py-4 m-2 w-auto text-base-content rounded-xl  ${getBgColorClass(s)}  cursor-pointer shadow-md duration-200 hover:-translate-y-1 hover:opacity-80
            ${s === currentVariation ? "outline-3 outline-base-content" : " outline-1 outline-base-300"}  outline  `}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};
