import React, { useState } from "react";
import { InputBox } from "../Input/InputBox";
import { AddressInfo } from "../../types";
import { AddressInputFields } from "../Account/AddressInputFields";

export const CheckoutInfo = ({
  heading,
  addressInfo,
  setAddressInfo,
}: {
  heading: string;
  addressInfo: AddressInfo;
  setAddressInfo: (address: AddressInfo) => void;
}) => {


    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      setState: React.Dispatch<React.SetStateAction<AddressInfo>>,
    ) => {
      const { name, value } = e.target;
      setState((prevState) => ({ ...prevState, [name]: value }));
    };

  return (
    <div className="mx-2">
      <h3>{heading}</h3>
      <div className="customer-information flex flex-col w-full">
        <AddressInputFields
          addressInfo={addressInfo}
          setAddressInfo={setAddressInfo}
        />
      </div>
    </div>
  );
};
