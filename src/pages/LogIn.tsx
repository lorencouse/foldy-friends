import React, { useState } from 'react'
import {  ButtonSquareRed } from '../components/BannerButton'
import { TextInput } from '../components/Input/TextInput'


const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [signUp, setSignUp] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      alert('Login successful!');
    } catch (error) {
      setError(error.message);
    }
  };

    const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      alert('Signup successful! Please check your email for a confirmation link.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container bg-pink-100 h-screen flex">
    <div className='bg-white m-auto flex flex-col align-center justify-center items-left text-left p-20'>
      <h1> {signUp ? "Sign Up" : "Sign In"}</h1>

        <div  className='sign-in-info flex flex-col justify-between mt-4'>
          <TextInput type="email" placeholder='Email' value={email} onChange={ (e) => setEmail(e.target.value) } />
          <TextInput type="password" placeholder='Password' value={password} onChange={ (e) => setPassword(e.target.value) } />
          { signUp && <div className='flex flex-row justify-between items-center '>
        <input type="checkbox" name="" id="" />
        <p className='p-3 text-wrap text-gray-600 '>I agree to the terms of use and privacy policy.</p>
      </div> }
          
          <div className="sign-in-up-buttons">
            { signUp ? <ButtonSquareRed label='Sign Up' onclick={  () => handleSignUp } /> : <ButtonSquareRed label='Sign In' onclick={  () => handleSignIn } />
             }
          </div>

        </div>
         {error && <p>{error}</p>}



      <div>
        <p>{ !signUp ? "Don't already have an account?" : ""}  <span className='font-bold text-red-500 cursor-pointer' onClick={ () => setSignUp(!signUp)}>{signUp ? "Back to Sign In Page" : "Sign Up Here"} </span></p>
      </div>


    </div>
    </div>


  )
};

export default LogIn;
