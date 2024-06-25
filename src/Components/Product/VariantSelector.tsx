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
    red: "bg-red-400",
    blue: "bg-blue-400",
    green: "bg-green-400",
    yellow: "bg-yellow-400",
    purple: "bg-purple-400",
    white: "bg-white",
    black: "bg-black",
  };

  const getBgColorClass = (variation: string) => {
    return variationColorMap[variation.toLowerCase()] || "bg-gray-400";
  };

  return (
    <div className="flex flex-col mt-5">
      <p className="font-semibold m-1">Select {heading}</p>
      <div className="variations flex flex-row justify-start capitalize font-medium ">
        {variations.map((s) => (
          <div
            key={s}
            onClick={() => setCurrentVariation(s)}
            className={`px-6 py-4 m-2 w-auto text-base-content outline  outline-base-content ${getBgColorClass(s)} text-white rounded-lg cursor-pointer
            ${s === currentVariation ? "outline-3" : "hover:opacity-80 outline-1"} `}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};
