// src/components/Account/AddressInputFields.tsx
import React from "react";
import { InputBox } from "../Input/InputBox";
import { AddressInfo } from "../../types";

const addressKeys: (keyof AddressInfo)[] = [
  "name",
  "address_1",
  "address_2",
  "city",
  "state",
  "zip",
  "country",
  "email",
  "phone",
];

interface AddressInputFieldsProps {
  addressInfo: AddressInfo;
  setAddressInfo: React.Dispatch<React.SetStateAction<AddressInfo>>;
}

export const AddressInputFields: React.FC<AddressInputFieldsProps> = ({
  addressInfo,
  setAddressInfo,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressInfo((prev) => ({ ...prev, [name]: value }));
  };

  type InputType = "text" | "email" | "tel";

  const getInputType = (key: string): InputType => {
    if (key === "email") return "email";
    if (key === "phone") return "tel";
    return "text";
  };

  return (
    <div>
      {addressKeys.map((key) => (
        <div key={key} className="flex flex-col">
          <label
            className="ml-2 mt-4 font-semibold"
            htmlFor={`shipping_${key}`}
          >
            {key.replace("_", " ")}:
          </label>
          <InputBox
            type={getInputType(key)}
            placeholder={key.replace("_", " ")}
            value={addressInfo[key] || ""}
            name={key}
            onChange={handleInputChange}
          />
        </div>
      ))}
    </div>
  );
};
