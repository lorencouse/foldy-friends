import React from "react";

interface AttributeSelectorProps {
  heading: string;
  attributes: string[];
  selectedAttributes: string[];
  setSelectedAttributes: (attributes: string[]) => void;
}

const AttributeSelector: React.FC<AttributeSelectorProps> = ({
  heading,
  attributes,
  selectedAttributes = [],
  setSelectedAttributes,
}) => {
  const handleChange = (attribute: string) => {
    setSelectedAttributes((prevSelectedAttributes) =>
      prevSelectedAttributes.includes(attribute)
        ? prevSelectedAttributes.filter((s) => s !== attribute)
        : [...prevSelectedAttributes, attribute],
    );
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
              checked={selectedAttributes.includes(attribute)}
              onChange={() => handleChange(attribute)}
              className="mr-2"
            />
            {attribute}
          </label>
        ))}
      </div>
    </div>
  );
};

export default AttributeSelector;
