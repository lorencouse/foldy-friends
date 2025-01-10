import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import {
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { auth, db } from "../lib/firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { AddressInfo } from "../types";
import { EditProfileFields } from "../components/Account/EditProfileFields";
import { ButtonSquareRed } from "../components/BannerButton";
import { UserDetails } from "../components/Account/UserDetails";
import { DeleteSvg, SignOutSvg, EditSvg } from "../components/svgPaths";
import { LoadingScreen } from "../components/Product/LoadingScreen";
import { UserData } from "../types";
import { emptyAddress } from "../data/constants";

const Account = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const [editProfile, setEditProfile] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<AddressInfo>(emptyAddress);
  const [billingInfo, setBillingInfo] = useState<AddressInfo>(emptyAddress);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData: UserData = userDoc.data() as UserData;
          console.log(userData);
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

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const credential = EmailAuthProvider.credential(
          currentUser.email!,
          prompt("Please enter your password to confirm")!,
        );
        await reauthenticateWithCredential(currentUser, credential);

        const userDocRef = doc(db, "users", currentUser.uid);
        await deleteDoc(userDocRef);

        await deleteUser(currentUser);

        router.push("/sign-in");
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
