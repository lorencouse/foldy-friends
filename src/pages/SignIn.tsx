import React, { useState } from 'react';
import { ButtonSquareRed } from '../components/BannerButton';
import { TextInput } from '../components/Input/TextInput';
import { supabase } from '../lib/supabaseClient';
import { AuthResponse, User } from '@supabase/supabase-js';


const signUp = async ({ email, password }: { email: string, password: string }): Promise<User | null> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

const signIn = async (email: string, password: string): Promise<User | null> => {
  const { data, error } = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      if (user) {
        alert('Login successful!');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("You must agree to the terms of use and privacy policy.");
      return;
    }
    try {
      const user = await signUp({ email, password });
      if (user) {
        alert('Signup successful! Please check your email for a confirmation link.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="login-container bg-pink-100 h-screen flex">
      <div className='bg-white m-auto flex flex-col align-center justify-center items-left text-left p-20'>
        <h1>{signUpPage ? "Sign Up" : "Sign In"}</h1>

        <div className='sign-in-info flex flex-col justify-between mt-4'>
          <TextInput type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextInput type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          
          {signUpPage && (
            <div className='flex flex-row justify-between items-center'>
              <input type="checkbox" checked={agreeToTerms} onChange={() => setAgreeToTerms(!agreeToTerms)} />
              <p className='p-3 text-wrap text-gray-600'>I agree to the terms of use and privacy policy.</p>
            </div>
          )}

          <div className="sign-in-up-buttons">
            {signUpPage 
              ? <ButtonSquareRed label='Sign Up' onClick={handleSignUp} /> 
              : <ButtonSquareRed label='Sign In' onClick={handleSignIn} />
            }
          </div>
        </div>
        
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <p>
            {!signUpPage ? "Don't have an account?" : ""}
            <span className='font-bold text-red-500 cursor-pointer ml-2' onClick={() => setSignUpPage(!signUpPage)}>
              {signUpPage ? "Back to Sign In Page" : "Sign Up Here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
