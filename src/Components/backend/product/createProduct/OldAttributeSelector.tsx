import React from "react";
import { ProductAttributes } from "../../../../types";

interface ProductAttributeSelectorProps {
  attributes: ProductAttributes;
  heading: string;
  selectedAttributes: ProductAttributes;
  setSelectedAttributes: (selectedAttributes: ProductAttributes) => void;
}

const OldAttributeSelector: React.FC<ProductAttributeSelectorProps> = ({
  attributes,
  heading,
  selectedAttributes,
  setSelectedAttributes,
}) => {
  const handleAttributeChange = (attribute: string, subattribute?: string) => {
    setSelectedAttributes((prevState) => {
      const newState = { ...prevState };

      if (!subattribute) {
        // Toggle the parent category
        if (
          newState[attribute] === true ||
          typeof newState[attribute] === "object"
        ) {
          delete newState[attribute];
        } else {
          newState[attribute] = true;
        }
      } else {
        // Selecting a child should add the parent and the child
        if (!newState[attribute] || typeof newState[attribute] !== "object") {
          newState[attribute] = {};
        }
        newState[attribute][subattribute] = !newState[attribute][subattribute];

        // Remove the subattribute if it is false
        if (!newState[attribute][subattribute]) {
          delete newState[attribute][subattribute];
        }

        // If no subcategories are selected, delete the parent category
        if (Object.keys(newState[attribute]).length === 0) {
          delete newState[attribute];
        }
      }

      return newState;
    });
  };

  return (
    <div className="selector">
      {/* <h3>{heading}</h3>
      <div className="attribute-selector flex flex-col max-h-96 overflow-scroll border-base border max-w-sm">
        {Object.keys(attributes).map((attribute: string) => (
          <div key={attribute} className="attribute">
            <label>
              <input
                type="checkbox"
                checked={selectedAttributes[attribute] === true}
                onChange={() => handleAttributeChange(attribute)}
              />
              {attribute}
            </label>
            <div className="subattributes ml-10 flex flex-col">
              {attributes[attribute].map((subattribute: string) => (
                <label key={subattribute} className="subattribute">
                  <input
                    type="checkbox"
                    checked={
                      selectedAttributes[attribute]?.[subattribute] || false
                    }
                    onChange={() =>
                      handleAttributeChange(attribute, subattribute)
                    }
                  />
                  {subattribute}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default OldAttributeSelector;
