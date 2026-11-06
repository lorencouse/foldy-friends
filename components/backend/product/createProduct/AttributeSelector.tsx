import React from "react";

interface AttributeSelectorProps {
  heading: string;
  attributes: string[];
  selectedAttributes: string[];
  setSelectedAttributes: React.Dispatch<React.SetStateAction<string[]>>;
}

const AttributeSelector: React.FC<AttributeSelectorProps> = ({
  heading,
  attributes,
  selectedAttributes = [],
  setSelectedAttributes,
}) => {
  const normalize = (str: string) => str.toLowerCase();

  const handleChange = (attribute: string) => {
    const normalizedAttribute = normalize(attribute);
    setSelectedAttributes((prevSelectedAttributes) => {
      if (prevSelectedAttributes.map(normalize).includes(normalizedAttribute)) {
        return prevSelectedAttributes.filter(
          (s) => normalize(s) !== normalizedAttribute,
        );
      } else {
        return [...prevSelectedAttributes, attribute];
      }
    });
  };

  return (
    <div className="attributes-selector max-w-md">
      <h3>{heading}</h3>
      <div className="flex flex-row flex-wrap">
        {attributes.map((attribute) => (
          <label
            htmlFor={attribute}
            key={attribute}
            className="block mb-2 border border-base m-2 p-2"
          >
            <input
              type="checkbox"
              id={attribute}
              checked={selectedAttributes
                .map(normalize)
                .includes(normalize(attribute))}
              onChange={() => handleChange(attribute)}
              className="mr-2"
            />
            {attribute}
          </label>
        ))}
      </div>
      <button onClick={() => setSelectedAttributes([])}>Clear All</button>
    </div>
  );
};

export default AttributeSelector;
