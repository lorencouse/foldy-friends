import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth, db } from "../lib/firebaseConfig"; // Adjust the import based on your project structure
import { doc, updateDoc } from "firebase/firestore";

import { AddressInfo } from '../types';
import { EditProfileFields } from '../components/Account/EditProfileFields';
import { ButtonSquareRed } from '../components/BannerButton';

const Account = () => {

  const [editProfile, setEditProfile] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<AddressInfo>({
    name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const [billingInfo, setBillingInfo] = useState<AddressInfo>({
    name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!user) return;

  //   const userRef = doc(db, "users", user.uid);

  //   try {
  //     await updateDoc(userRef, {
  //       shipping_info: shippingInfo,
  //       billing_info: addBillingInfo ? billingInfo : shippingInfo,
  //     });
  //     alert("Profile updated successfully");
  //   } catch (error) {
  //     console.error("Error updating profile: ", error);
  //     alert("Failed to update profile");
  //   }
  // };



  return (
    <div className="profile-page bg-base-100 min-h-screen">
      <div className="user-profile max-w-7xl m-auto">
        <h1>Account</h1>
        { editProfile &&   <EditProfileFields billingInfo={billingInfo} setBillingInfo={setBillingInfo} setShippingInfo={setShippingInfo} shippingInfo={shippingInfo} /> }
        <ButtonSquareRed label='Edit Profile' onClick={ () => setEditProfile(!editProfile) } />
        <ButtonSquareRed label='Sign Out' onClick={handleSignOut} />
      </div>
    </div>
  );
};

export default Account;
