import React from "react";
import useAuth from "../../hooks/useAuth";
import { AddressInfo } from "../../types";

export const UserDetails = ({
  shippingInfo,
  billingInfo,
}: {
  shippingInfo: AddressInfo;
  billingInfo: AddressInfo;
}) => {
  const { user } = useAuth();

  const addressKeys = [
    "name",
    "address_1",
    "address_2",
    "city",
    "state",
    "zip",
    "country",
  ];

  return (
    <div>
      {user && (
        <div className="flex flex-row flex-wrap md:grid md:grid-cols-3 justify-around gap-20">
          <div className="flex flex-col gap-7">
            <p>Welcome back {shippingInfo.name}</p>

            <img
              src="/assets/profile-photo.jpg"
              alt="user profile avatar"
              className="rounded-full max-h-32 max-w-32"
            />
          </div>
          <div className="shipping-info flex flex-col">
            <h3>Shipping Info</h3>

            {addressKeys.map((key) => (
              <div key={key} className="flex flex-col capitalize my-4">
                <p className="font-semibold">{`${key.replace("_", " ")}: `}</p>
                <p className="">{shippingInfo[key as keyof AddressInfo]}</p>
              </div>
            ))}

            <p>Email: {user.email}</p>
          </div>

          <div className="billing-info flex flex-col justify-around">
            {billingInfo.name !== "" && (
              <>
                <h3>Billing Info</h3>
                {addressKeys.map((key) => (
                  <div key={key} className="flex flex-col capitalize">
                    <p className="font-semibold">{`${key.replace("_", " ")}:`}</p>
                    <p>{billingInfo[key as keyof AddressInfo]}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
