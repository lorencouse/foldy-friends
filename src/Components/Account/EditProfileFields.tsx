import React, { useState } from 'react';
import { InputBox } from '../Input/InputBox';
import { ButtonSquareRed } from '../BannerButton';
import { AddressInfo } from '../types';
import useAuth from '../../hooks/useAuth';
import { auth, db } from '../../lib/firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { updateProfile, updateEmail } from "firebase/auth";
import { AddressInputFields } from './AddressInputFields';
import { UpdateSvg, CancelSvg } from '../svgPaths';

interface EditProfileFieldsProps {
  shippingInfo: AddressInfo;
  setShippingInfo: (info: AddressInfo) => void;
  billingInfo: AddressInfo;
  setBillingInfo: (info: AddressInfo) => void;
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
  const [error, setError] = useState<string | null>(null);

  const handleSaveProfile = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const updatedUserData = {
        id: currentUser.uid,
        created_at: new Date(),
        shipping_info: shippingInfo,
        billing_info: billingInfo,
        photo_url: currentUser.photoURL || '',
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
      console.log('Profile updated successfully');
    } catch (error: any) {
      console.error("Error updating profile: ", error);
      setError(error.message);
    }
  };

  return (
    <div className='flex flex-row flex-wrap md:grid md:grid-cols-2 justify-around'>
      <div className="shipping-info flex flex-col">
        <div className='flex flex-col'>

        </div>
        <h2 className='text-left'>Shipping Info</h2>

        <AddressInputFields addressInfo={shippingInfo} setAddressInfo={setShippingInfo} />

        <label className='ml-2 mt-4 font-semibold' htmlFor="email">Email:</label>
          <InputBox
            type="text"
            placeholder="Email"
            value={user?.email || ''}
            name="email"
            onChange={() => {}}
            disabled
          />

        <div className="flex" onClick={() => setAddBillingInfo(!addBillingInfo)}>
          <input type="checkbox" className="checkbox" checked={addBillingInfo} readOnly />
          <label className="label cursor-pointer">Separate Billing Info</label>
        </div>

        {!addBillingInfo && (
          <div className='flex flex-row gap-4 m-auto'>
            <ButtonSquareRed label='Update' icon={UpdateSvg} onClick={handleSaveProfile} />
            <ButtonSquareRed label='Cancel' icon={CancelSvg} onClick={ () => setEditProfile(false)} />

          </div>
        )}
      </div>
      {addBillingInfo && (
        <div className="billing-info flex flex-col justify-around">
          <h2 className='text-left'>Billing Info</h2>

          <AddressInputFields addressInfo={billingInfo} setAddressInfo={setBillingInfo} />
            
          <div className='flex flex-col sm:flex-row flex-wrap gap-4 m-auto'>
            <ButtonSquareRed label='Update' icon={UpdateSvg} onClick={handleSaveProfile} />
            <ButtonSquareRed label='Cancel' icon={CancelSvg} onClick={ () => setEditProfile(false)} />

          </div>
        </div>
      )}
    </div>
  );
};
