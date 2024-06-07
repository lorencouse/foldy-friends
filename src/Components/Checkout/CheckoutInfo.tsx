import React, { useState } from 'react'
import { InputBox } from '../Input/InputBox'
import { AddressInfo } from '../../types'


export const CheckoutInfo = ({ heading }: { heading: string }) => {
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className='mx-2'>
      <h3>{heading}</h3>
      <div className="customer-information flex flex-col w-full">
        <InputBox
          type='text'
          placeholder='Name'
          value={addressInfo.name}
          onChange={handleAddressChange}
          name='name'
        />
        <InputBox
          type='text'
          placeholder='Address Line 1'
          value={addressInfo.address_1}
          onChange={handleAddressChange}
          name='address_1'
        />
        <InputBox
          type='text'
          placeholder='Address Line 2'
          value={addressInfo.address_2}
          onChange={handleAddressChange}
          name='address_2'
        />
        <InputBox
          type='text'
          placeholder='City'
          value={addressInfo.city}
          onChange={handleAddressChange}
          name='city'
        />
        <InputBox
          type='text'
          placeholder='State'
          value={addressInfo.state}
          onChange={handleAddressChange}
          name='state'
        />
        <InputBox
          type='text'
          placeholder='Zip Code'
          value={addressInfo.zip}
          onChange={handleAddressChange}
          name='zip'
        />
        <InputBox
          type='text'
          placeholder='Country'
          value={addressInfo.country}
          onChange={handleAddressChange}
          name='country'
        />
        <InputBox
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name='email'
        />
        <InputBox
          type='tel'
          placeholder='Phone Number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name='tel'
        />
      </div>
    </div>
  );
};