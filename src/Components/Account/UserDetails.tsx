import React from 'react';
import useAuth from '../../hooks/useAuth';
import { AddressInfo } from '../../types';

export const UserDetails = ({ shippingInfo, billingInfo }: { shippingInfo: AddressInfo, billingInfo: AddressInfo }) => {
  const { user } = useAuth();

  const addressKeys = ['name', 'address_1', 'address_2', 'city', 'state', 'zip', 'country'];

  return (
    <div>
      {user && (
    <div className='flex flex-row flex-wrap md:grid md:grid-cols-2 justify-around'>
        <div className="shipping-info flex flex-col">

          <h3>Shipping Info</h3>
        
        

          {addressKeys.map((key) => (
            <div key={key} className='flex flex-col capitalize my-4'>
              <p className="font-semibold">
                  {`${key.replace('_', ' ')}: `}
              </p>
                <p className="">
                {shippingInfo[key as keyof AddressInfo]}
              </p>
            </div>
          ))}

          <p>Email: {user.email}</p>
        </div>

        <div className="billing-info flex flex-col justify-around">

          <h3>Billing Info</h3>
          {addressKeys.map((key) => (
            <div key={key} className='flex flex-col capitalize '>
              <p className="font-semibold">
                  {`${key.replace('_', ' ')}: `}
              </p>
                <p className="">
                {billingInfo[key as keyof AddressInfo]}
              </p>
            </div>
          ))}
          </div>
        </div>



      )}
    </div>
  )
}
