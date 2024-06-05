import React, { useState } from 'react'
import { CheckoutInfo } from '../Components/Checkout/CheckoutInfo'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { PaymentInfo } from '../Components/Checkout/PaymentInfo';
import { ButtonSquareRed } from '../components/BannerButton';
import MiniCart from '../components/Navbar/MiniCart';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'
);

const Checkout = () => {

  const [ billing, setBilling] = useState<boolean>(false);

    const options = {
    // passing the client secret obtained from the server
    clientSecret: process.env.STRIPE_SECRET_KEY,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
    <div className="checkout-container max-w-5xl m-auto "> 
    <div className='flex flex-row flex-wrap md:grid md:grid-cols-2 justify-around '>
        <div className="checkout-left-col flex flex-col">
          <CheckoutInfo heading="Shipping Details" />
          <div className="billing-checkbox flex items-center font-semibold ml-2" onClick={() => setBilling( !billing)}>
            <input type="checkbox" checked={billing}   />
            <label >Enter Seperate Billing Details</label>
          </div>

        </div>
        <div className="checkout-right-col flex flex-col justify-around">
          
          { billing && 
          <div className='w-full mb-10'>
          <CheckoutInfo heading='Billing Deatils' />
          </div>
          }
          
          <MiniCart />

          <div className="flex place-order-button w-full items-center justify-end ">
            <ButtonSquareRed label='Place Order' onclick={() => {}} />
          </div>
        </div>

   
    </div>


    
    </div>
    </Elements>
  )
}

export default Checkout;
