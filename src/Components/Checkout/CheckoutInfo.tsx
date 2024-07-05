import React from "react";
import { AddressInfo } from "../../types";
import { AddressInputFields } from "../Account/AddressInputFields";

export const CheckoutInfo = ({
  heading,
  addressInfo,
  setAddressInfo,
}: {
  heading: string;
  addressInfo: AddressInfo;
  setAddressInfo: React.Dispatch<React.SetStateAction<AddressInfo>>;
}) => {


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
