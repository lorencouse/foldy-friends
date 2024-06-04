import React from 'react'
import { CheckoutInfo } from './Components/Checkout/CheckoutInfo'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { PaymentInfo } from './Components/Checkout/PaymentInfo';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'
);

const Checkout = () => {

    const options = {
    // passing the client secret obtained from the server
    clientSecret: process.env.STRIPE_SECRET_KEY,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
    <div className='flex flex-col max-w-7xl m-auto'>
        <CheckoutInfo />
        <PaymentInfo />
    </div>
    </Elements>
  )
}

export default Checkout;
