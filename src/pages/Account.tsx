import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { InputBox } from '../components/Input/InputBox';
import { ButtonSquareRed } from '../components/BannerButton';
import { AddressInfo } from '../types';

const Account = () => {
  const [username, setUsername] = useState('');
  const [addBillingInfo, setAddBillingInfo] = useState(false);
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

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    // e.g., update user profile in Firebase or your database
  };

  return (
    <div className="profile-page bg-base-100 min-h-screen">
      <div className="user-profile max-w-7xl m-auto">
        <div className="customer-info flex flex-row flex-wrap gap-8">
          <div className="shipping-info min-w-96 m-auto">
            <div className='flex flex-col'>
              <h1>Account</h1>
              <label className='ml-2 mt-4 font-semibold' htmlFor="email">Email:</label>
              <InputBox
                type="text"
                placeholder="Email"
                value={user.email}
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
            <input type="checkbox" className="checkbox" checked={addBillingInfo}   />
            <label className="label cursor-pointer">Seperate Billing Info</label>
          </div>

            {!addBillingInfo && (
              <div className='flex flex-row gap-4 m-auto'>
                <ButtonSquareRed label='Update' onClick={handleSubmit} />
                <ButtonSquareRed label='Sign Out' onClick={handleSignOut} />
              </div>
            )}
          </div>
          {addBillingInfo && (
            <div className="billing-info min-w-96 m-auto">
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
                <ButtonSquareRed label='Update' onClick={handleSubmit} />
                <ButtonSquareRed label='Sign Out' onClick={handleSignOut} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
