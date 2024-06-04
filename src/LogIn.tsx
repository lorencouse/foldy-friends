import React from 'react'
import { ButtonRoundRed } from './Components/BannerButton'
import { TextInput } from './Components/Input/TextInput'

const LogIn = () => {
  return (
    <div className="login-container bg-pink-100 h-screen flex">
    <div className='bg-white m-auto flex flex-col align-center justify-center items-left text-left p-20'>
      <h1>Sign Up</h1>
      <div className='signup-info flex flex-col justify-between mt-4'>
        <TextInput type="text" placeholder='Your Name' />
        <TextInput type="email" placeholder='Email' />
        <TextInput type="password" placeholder='Password' />
      </div>
      <ButtonRoundRed label='Sign Up' url=''/>
      <div>
        <p>Already have an account? <a href="" className='text-red-500 font-bold ' >Login Here</a></p>
      </div>
      <div className='flex flex-row justify-between items-baseline '>
        <input type="checkbox" name="" id="" />
        <p className='p-3 text-wrap text-gray-600 '>I agree to the terms of use and privacy policy.</p>
      </div>
    </div>
    </div>


  )
};

export default Home;
