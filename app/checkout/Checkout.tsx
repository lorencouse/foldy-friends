"use client";

import React, { useState } from "react";
import { CheckoutInfo } from "@/components/Checkout/CheckoutInfo";
import { ButtonSquareRed } from "@/components/BannerButton";
import { useShopContext } from "@/context/ShopContext";
import { EmptyCart } from "@/components/Cart/EmptyCart";
import { LockSvg } from "@/components/svgPaths";
import { AddressInfo, UserData } from "@/types";
import { CartFullSize } from "@/components/Cart/CartFullSize";
import { Alert } from "@/components/Alert";
import { emptyAddress } from "@/data/constants";
import { redirect } from "next/navigation";

const Checkout = ({ user }: { user: UserData | null }) => {
  const [billing, setBilling] = useState<boolean>(false);
  const { cartCount } = useShopContext();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [shippingInfo, setShippingInfo] = useState<AddressInfo>(
    user ? user.shipping_info : emptyAddress,
  );

  const [billingInfo, setBillingInfo] = useState<AddressInfo>(
    user ? user.billing_info : emptyAddress,
  );

  async function placeOrder() {
    if (
      shippingInfo.name === "" ||
      shippingInfo.address_1 === "" ||
      shippingInfo.city === "" ||
      shippingInfo.state === "" ||
      shippingInfo.zip === "" ||
      shippingInfo.country === "" ||
      shippingInfo.email === "" ||
      shippingInfo.phone === ""
    ) {
      setAlertMessage("Please fill in all required fields");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      return;
    }
    setAlertMessage("Order submitted!");
    setShippingInfo(emptyAddress);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      redirect("/");
    }, 2000);
  }

  return (
    <div className="flex justify-center sm:mt-6 mt-4 mb-12">
      <div className="checkout-container max-w-5xl">
        <h1 className="mx-4">Check Out</h1>
        {cartCount > 0 ? (
          <div className="flex flex-row flex-wrap md:grid md:grid-cols-2 justify-around">
            <div className="checkout-left-col flex flex-col">
              <CheckoutInfo
                heading="Shipping Info"
                addressInfo={shippingInfo}
                setAddressInfo={setShippingInfo}
              />
              <div
                className="billing-checkbox flex items-center font-semibold ml-2"
                onClick={() => setBilling(!billing)}
              >
                <input type="checkbox" checked={billing} readOnly />
                <label>Separate Billing Info</label>
              </div>
            </div>
            <div className="checkout-right-col flex flex-col justify-around">
              {billing && (
                <div className="w-full mb-10">
                  <CheckoutInfo
                    heading="Billing Info"
                    addressInfo={billingInfo}
                    setAddressInfo={setBillingInfo}
                  />
                </div>
              )}
              <CartFullSize />
              <div className="flex flex-col place-order-button w-full items-center justify-end">
                {showAlert && <Alert message={alertMessage} />}
                <ButtonSquareRed
                  icon={LockSvg}
                  label="Place Order"
                  onClick={() => placeOrder()}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <EmptyCart />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
