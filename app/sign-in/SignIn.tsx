"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import { InputBox } from "@/components/Input/InputBox";
import { ButtonSquareRed } from "@/components/BannerButton";
import { SignInSvg } from "@/components/svgPaths";
import { auth, db } from "@/lib/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "@/components/Alert";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        setShowAlert(false);
        redirect("/account");
      } else {
        setAlertMessage("Authentication failed. Please try again.");
        setShowAlert(true);
      }
    } catch (err: any) {
      setAlertMessage(err.message);
      setShowAlert(true);
    }
  };

  const handleSignUp = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      setAlertMessage("You must agree to the terms of use and privacy policy.");
      setShowAlert(true);
      return;
    }
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
      });
      if (auth.currentUser) {
        setShowAlert(false);
        redirect("/account");
      } else {
        setAlertMessage("Account creation failed. Please try again.");
        setShowAlert(true);
      }
    } catch (err: any) {
      setAlertMessage(err.message);
      setShowAlert(true);
    }
  };

  const handleSignInClick = () => {
    handleSignIn({ preventDefault: () => {} } as React.SyntheticEvent);
  };

  const handleSignUpClick = () => {
    handleSignUp({ preventDefault: () => {} } as React.SyntheticEvent);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      signUpPage ? handleSignUp(e as any) : handleSignIn(e as any);
    }
  };

  return (
    <div
      className="login-container bg-accent flex justify-center items-center"
      onKeyDown={handleKeyPress}
    >
      <div className="bg-base-100 rounded-lg shadow-2xl lg:m-20 m-10 flex flex-col align-center justify-center items-left text-left lg:p-20 p-12">
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
            <div className="flex flex-col">
              <InputBox
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="flex flex-row justify-start items-center">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                />
                <p className="p-3 text-wrap text-gray-600">
                  I agree to the terms of use and privacy policy.
                </p>
              </div>
            </div>
          )}
          {showAlert && <Alert message={alertMessage} />}

          <div className="sign-in-up-buttons">
            {signUpPage ? (
              <ButtonSquareRed
                label="Sign Up"
                icon={SignInSvg}
                onClick={handleSignUpClick}
              />
            ) : (
              <ButtonSquareRed
                label="Sign In"
                icon={SignInSvg}
                onClick={handleSignInClick}
              />
            )}
          </div>

          <ButtonSquareRed
            label="Sign in with Google"
            icon={SignInSvg}
            onClick={async () => {
              const provider = new GoogleAuthProvider();
              try {
                const result = await signInWithPopup(auth, provider);
                if (auth.currentUser) {
                  // Redirect or handle success
                } else {
                  setAlertMessage(
                    "Google authentication failed. Please try again.",
                  );
                  setShowAlert(true);
                }
              } catch (error: any) {
                setAlertMessage(error.message);
                setShowAlert(true);
              }
            }}
          />
        </div>
        <div>
          <p>
            {!signUpPage ? "Don't have an account?" : ""}
            <span
              className="font-bold text-red-500 cursor-pointer ml-2"
              onClick={() => {
                setSignUpPage(!signUpPage);
                setShowAlert(false);
              }}
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
