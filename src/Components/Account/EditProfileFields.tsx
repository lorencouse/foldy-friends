// src/components/Account/EditProfileFields.tsx
import React, { useState } from "react";
import { ButtonSquareRed } from "../BannerButton";
import { AddressInfo } from "../../types";
import useAuth from "../../hooks/useAuth";
import { auth, db } from "../../lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile, updateEmail } from "firebase/auth";
import { AddressInputFields } from "./AddressInputFields";
import { UpdateSvg, CancelSvg } from "../svgPaths";
import { LoadingScreen } from "../Product/LoadingScreen";

interface EditProfileFieldsProps {
  shippingInfo: AddressInfo;
  setShippingInfo: React.Dispatch<React.SetStateAction<AddressInfo>>;
  billingInfo: AddressInfo;
  setBillingInfo: React.Dispatch<React.SetStateAction<AddressInfo>>;
  setEditProfile: (edit: boolean) => void;
}

export const EditProfileFields: React.FC<EditProfileFieldsProps> = ({
  shippingInfo,
  setShippingInfo,
  billingInfo,
  setBillingInfo,
  setEditProfile,
}) => {
  const [addBillingInfo, setAddBillingInfo] = useState(false);
  const { user, loading } = useAuth();

  const handleSaveProfile = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const updatedUserData = {
        id: currentUser.uid,
        created_at: new Date(),
        shipping_info: shippingInfo,
        billing_info: billingInfo,
        photo_url: currentUser.photoURL || "",
        order_history: [],
      };

      await setDoc(userDocRef, updatedUserData, { merge: true });

      if (currentUser.email) {
        await updateEmail(currentUser, currentUser.email);
      }

      if (currentUser.displayName || currentUser.photoURL) {
        await updateProfile(currentUser, {
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
      }

      setEditProfile(false);
      console.log("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating profile: ", error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-row flex-wrap md:grid md:grid-cols-2 justify-around">
      <div className="shipping-info flex flex-col">
        <div className="flex flex-col"></div>
        <h2 className="text-left">Shipping Info</h2>

        <AddressInputFields
          addressInfo={shippingInfo}
          setAddressInfo={setShippingInfo}
        />

        <p>Email: {user?.email || ""}</p>

        <div
          className="flex"
          onClick={() => setAddBillingInfo(!addBillingInfo)}
        >
          <input
            type="checkbox"
            className="checkbox"
            checked={addBillingInfo}
            readOnly
          />
          <label className="label cursor-pointer">Edit Billing Info</label>
        </div>

        {!addBillingInfo && (
          <div className="flex flex-row gap-4 m-auto">
            <ButtonSquareRed
              label="Update"
              icon={UpdateSvg}
              onClick={handleSaveProfile}
            />
            <ButtonSquareRed
              label="Cancel"
              icon={CancelSvg}
              onClick={() => setEditProfile(false)}
            />
          </div>
        )}
      </div>
      {addBillingInfo && (
        <div className="billing-info flex flex-col justify-around">
          <h2 className="text-left">Billing Info</h2>

          <AddressInputFields
            addressInfo={billingInfo}
            setAddressInfo={setBillingInfo}
          />

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 m-auto">
            <ButtonSquareRed
              label="Update"
              icon={UpdateSvg}
              onClick={handleSaveProfile}
            />
            <ButtonSquareRed
              label="Cancel"
              icon={CancelSvg}
              onClick={() => setEditProfile(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
