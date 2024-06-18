import React, { useState } from "react";
import { useRouter } from "next/router";
import { InputBox } from "../components/Input/InputBox";
import { ButtonSquareRed } from "../components/BannerButton";
import { auth } from "../lib/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { SignInSvg } from "../components/svgPaths";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/account");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("You must agree to the terms of use and privacy policy.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/account");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container bg-secondary-content h-screen flex">
      <div className="bg-base-100 m-auto flex flex-col align-center justify-center items-left text-left p-20">
        <h1>{signUpPage ? "Sign Up" : "Sign In"}</h1>
        <div className="sign-in-info flex flex-col justify-between mt-4">
          <InputBox
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {signUpPage && (
            <div className="flex flex-row justify-between items-center">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
              />
              <p className="p-3 text-wrap text-gray-600">
                I agree to the terms of use and privacy policy.
              </p>
            </div>
          )}
          <div className="sign-in-up-buttons">
            {signUpPage ? (
              <ButtonSquareRed
                label="Sign Up"
                icon={SignInSvg}
                onClick={handleSignUp}
              />
            ) : (
              <ButtonSquareRed
                label="Sign In"
                icon={SignInSvg}
                onClick={handleSignIn}
              />
            )}
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <p>
            {!signUpPage ? "Don't have an account?" : ""}
            <span
              className="font-bold text-red-500 cursor-pointer ml-2"
              onClick={() => setSignUpPage(!signUpPage)}
            >
              {signUpPage ? "Back to Sign In Page" : "Sign Up Here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
