import React, { useState } from 'react';
import { InputBox } from '../Input/InputBox';
import { ButtonSquareRed } from '../BannerButton';
import { AddressInfo } from '../types';
import useAuth from '../../hooks/useAuth';
import { auth, db } from '../../lib/firebaseConfig';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { updateProfile, updateEmail } from "firebase/auth";

interface EditProfileFieldsProps {
  shippingInfo: AddressInfo;
  setShippingInfo: (info: AddressInfo) => void;
  billingInfo: AddressInfo;
  setBillingInfo: (info: AddressInfo) => void;
}

export const EditProfileFields: React.FC<EditProfileFieldsProps> = ({
  shippingInfo,
  setShippingInfo,
  billingInfo,
  setBillingInfo,
}) => {
  const [addBillingInfo, setAddBillingInfo] = useState(false);
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<AddressInfo>>) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveProfile = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      // Ensure user data
      const { displayName, photoURL, email } = currentUser;
      const userDocRef = doc(db, 'users', currentUser.uid);
      const updatedUserData = {
        id: currentUser.uid,
        created_at: new Date(),
        shipping_info: shippingInfo,
        billing_info: addBillingInfo ? billingInfo : shippingInfo,
        photo_url: photoURL || '',
        order_history: [],
      };

      await setDoc(userDocRef, updatedUserData, { merge: true });

      if (email) {
        await updateEmail(currentUser, email);
      }

      if (displayName || photoURL) {
        await updateProfile(currentUser, {
          displayName,
          photoURL,
        });
      }

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
          <label className='ml-2 mt-4 font-semibold' htmlFor="email">Email:</label>
          <InputBox
            type="text"
            placeholder="Email"
            value={user?.email || ''}
            name="email"
            onChange={() => {}}
            disabled
          />
        </div>
        <h2 className='text-left'>Shipping Info</h2>
        {Object.keys(shippingInfo).map((key) => (
          <div key={key} className='flex flex-col'>
            <label className='ml-2 mt-4 font-semibold' htmlFor={`shipping_${key}`}>{`${key.replace('_', ' ')}:`}</label>
            <InputBox
              type="text"
              placeholder={key.replace('_', ' ')}
              value={shippingInfo[key]}
              name={key}
              onChange={(e) => handleInputChange(e, setShippingInfo)}
            />
          </div>
        ))}

        <div className="flex" onClick={() => setAddBillingInfo(!addBillingInfo)}>
          <input type="checkbox" className="checkbox" checked={addBillingInfo} readOnly />
          <label className="label cursor-pointer">Separate Billing Info</label>
        </div>

        {!addBillingInfo && (
          <div className='flex flex-row gap-4 m-auto'>
            <ButtonSquareRed label='Update' onClick={handleSaveProfile} />
          </div>
        )}
      </div>
      {addBillingInfo && (
        <div className="billing-info flex flex-col justify-around">
          <h2 className='text-left'>Billing Info</h2>
          {Object.keys(billingInfo).map((key) => (
            <div key={key} className='flex flex-col'>
              <label className='ml-2 mt-4 font-semibold' htmlFor={`billing_${key}`}>{`${key.replace('_', ' ')}:`}</label>
              <InputBox
                type="text"
                placeholder={key.replace('_', ' ')}
                value={billingInfo[key]}
                name={key}
                onChange={(e) => handleInputChange(e, setBillingInfo)}
              />
            </div>
          ))}
          <div className='flex flex-row gap-4 m-auto'>
            <ButtonSquareRed label='Update' onClick={handleSaveProfile} />
          </div>
        </div>
      )}
    </div>
  );
};
