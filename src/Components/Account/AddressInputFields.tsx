import React from "react";
import { InputBox } from "../Input/InputBox";
import { AddressInfo } from "../../types";

export const AddressInputFields = ({
  addressInfo,
  setAddressInfo,
}: {
  addressInfo: AddressInfo;
  setAddressInfo: (address: AddressInfo) => void;
}) => {
  const addressKeys = [
    "name",
    "address_1",
    "address_2",
    "city",
    "state",
    "zip",
    "country",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<AddressInfo>>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      {addressKeys.map((key) => (
        <div key={key} className="flex flex-col">
          <label
            className="ml-2 mt-4 font-semibold"
            htmlFor={`shipping_${key}`}
          >{`${key.replace("_", " ")}:`}</label>
          <InputBox
            type="text"
            placeholder={key.replace("_", " ")}
            value={addressInfo[key as keyof AddressInfo] || ""}
            name={key}
            onChange={(e) => handleInputChange(e, setAddressInfo)}
          />
        </div>
      ))}
    </div>
  );
};
