import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { signOut, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { auth, db } from "../lib/firebaseConfig"; 
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { AddressInfo } from '../types';
import { EditProfileFields } from '../components/Account/EditProfileFields';
import { ButtonSquareRed } from '../components/BannerButton';
import { UserDetails } from '../components/Account/UserDetails';

const Account = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
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

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        // Re-authenticate the user before deleting
        const credential = EmailAuthProvider.credential(currentUser.email, prompt("Please enter your password to confirm"));
        await reauthenticateWithCredential(currentUser, credential);

        // Delete user document from Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        await deleteDoc(userDocRef);

        // Delete user from Firebase Authentication
        await deleteUser(currentUser);

        // Clear local storage and navigate to sign-in page
        router.push("/sign-in");
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="profile-page bg-base-100 min-h-screen">
      <div className="user-profile max-w-7xl m-auto">
        <h1>Account</h1>
        

        {editProfile ? (
          <EditProfileFields 
            billingInfo={billingInfo} 
            setBillingInfo={setBillingInfo} 
            setShippingInfo={setShippingInfo} 
            shippingInfo={shippingInfo} 
            setEditProfile={setEditProfile} 
          />
        ) :         
        <UserDetails shippingInfo={shippingInfo} billingInfo={billingInfo} />
        }
        <ButtonSquareRed label='Edit Profile' onClick={() => setEditProfile(!editProfile)} />
        <ButtonSquareRed label='Sign Out' onClick={handleSignOut} />
        <ButtonSquareRed label='Delete' onClick={handleDeleteAccount} />
      </div>
    </div>
  );
};

export default Account;
