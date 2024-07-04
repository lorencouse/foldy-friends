import React, { useState } from "react";
import { useRouter } from "next/router";
import { InputBox } from "../components/Input/InputBox";
import { ButtonSquareRed } from "../components/BannerButton";
import { SignInSvg } from "../components/svgPaths";
import { auth, db } from "../lib/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "../components/Alert";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showAlert(false);
      router.push("/account");
    } catch (err) {
      setAlertMessage(err.message);
      setShowAlert(true);
    }
  };

  const handleSignUp = async (e) => {
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
      setShowAlert(false);
      router.push("/account");
    } catch (err) {
      setAlertMessage(err.message);
      setShowAlert(true);
    }
  };

  return (
    <div className="login-container bg-accent flex justify-center items-center">
      <div className="bg-base-100 rounded-lg shadow-2xl lg:m-20 m-10 flex flex-col align-center justify-center items-left text-left p-20 ">
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
