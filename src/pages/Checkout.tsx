import React, { useState, useEffect } from "react";
import { CheckoutInfo } from "../components/Checkout/CheckoutInfo";
import { ButtonSquareRed } from "../components/BannerButton";
import { useShopContext } from "../context/ShopContext";
import { EmptyCart } from "../components/Cart/EmptyCart";
import { Collections } from "../components/ProductCategory/Collections";
import { LockSvg } from "../components/svgPaths";
import useAuth from "../hooks/useAuth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";
import { AddressInfo } from "../types";
import { CartFullSize } from "../components/Cart/CartFullSize";
import { Alert } from "../components/Alert";
import { useRouter } from "next/router";
import { LoadingScreen } from "../components/Product/LoadingScreen";
import { emptyAddress } from "../data/constants";

const Checkout = () => {
  const router = useRouter();
  const [billing, setBilling] = useState<boolean>(false);
  const { cartCount, allProducts } = useShopContext();
  const { user, loading } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [shippingInfo, setShippingInfo] = useState<AddressInfo>(emptyAddress);

  const [billingInfo, setBillingInfo] = useState<AddressInfo>(emptyAddress);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setShippingInfo(userData.shipping_info || shippingInfo);
          setBillingInfo(userData.billing_info || billingInfo);
        } else {
          const newUserProfile = {
            email: auth.currentUser?.email,
            shipping_info: shippingInfo,
            billing_info: billingInfo,
          };
          await setDoc(userDocRef, newUserProfile);
        }
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

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
      router.push("/");
    }, 2000);
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex justify-center my-12">
      <div className="checkout-container max-w-5xl">
        <h1>Check Out</h1>
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
            <Collections
              products={allProducts}
              header="You Might Be Interested In..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
