import React, { useState } from 'react';
import { InputBox } from '../Input/InputBox';
import { AddressInfo } from '../../types';
import { AddressInputFields } from '../Account/AddressInputFields';

export const CheckoutInfo = ({ heading, addressInfo, setAddressInfo }: { heading: string, addressInfo: AddressInfo, setAddressInfo: (address: AddressInfo) => void }) => {
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  return (
    <div className='mx-2'>
      <h3>{heading}</h3>
      <div className="customer-information flex flex-col w-full">
        <AddressInputFields addressInfo={addressInfo} setAddressInfo={setAddressInfo} />
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
