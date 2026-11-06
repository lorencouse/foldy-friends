"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import {
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { AddressInfo } from "@/types";
import { EditProfileFields } from "@/components/Account/EditProfileFields";
import { ButtonSquareRed } from "@/components/BannerButton";
import { UserDetails } from "@/components/Account/UserDetails";
import { DeleteSvg, SignOutSvg, EditSvg } from "@/components/svgPaths";
import { UserData } from "@/types";
import { emptyAddress } from "@/data/constants";

const Account = ({ user }: { user: UserData }) => {

  const [error, setError] = useState("");

  const [editProfile, setEditProfile] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<AddressInfo>(
    user?.shipping_info ? user.shipping_info : emptyAddress,
  );
  const [billingInfo, setBillingInfo] = useState<AddressInfo>(
    user?.billing_info ? user.billing_info : emptyAddress,
  );

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      redirect("/sign-in");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!auth.currentUser) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      try {
        const credential = EmailAuthProvider.credential(
          currentUser.email!,
          prompt("Please enter your password to confirm")!,
        );
        await reauthenticateWithCredential(currentUser, credential);
        redirect("/sign-in");
        await deleteDoc(userDocRef);
        await deleteDoc(userDocRef);

        await deleteUser(currentUser);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="profile-page bg-base-100 min-h-screen flex justify-start">
      <div className="user-profile max-w-7xl md:mx-20 mx-5 my-10">
        <h1>Account</h1>

        {editProfile ? (
          <>
            <EditProfileFields
              billingInfo={billingInfo}
              setBillingInfo={setBillingInfo}
              setShippingInfo={setShippingInfo}
              shippingInfo={shippingInfo}
              setEditProfile={setEditProfile}
            />
          </>
        ) : (
          <>
            <UserDetails
              shippingInfo={shippingInfo}
              billingInfo={billingInfo}
            />
            <ButtonSquareRed
              label="Edit Profile"
              icon={EditSvg}
              onClick={() => setEditProfile(!editProfile)}
            />
          </>
        )}

        <div className="flex flex-row gap-4 justify-between mx-4">
          <ButtonSquareRed
            label="Sign Out"
            icon={SignOutSvg}
            onClick={handleSignOut}
          />
          <ButtonSquareRed
            label="Delete"
            icon={DeleteSvg}
            onClick={handleDeleteAccount}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
