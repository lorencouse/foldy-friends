import React, { useState } from "react";

export const Subscribe = () => {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValid(validateEmail(newEmail));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      // Handle valid form submission
      console.log("Email submitted:", email);
      setEmail("");
    } else {
      // Handle invalid form submission
      console.log("Invalid email");
    }
  };

  return (
    <div className="promo-box relative flex flex-col justify-center items-center bg-secondary pt-12 my-10 rounded-2xl">
      <div className="subscribe-box my-12 text-center ">
        <p className="banner-heading text-white px-6">
          Get in on Exclusive Offers!
        </p>
        {!isValid && (
          <p className="text-white mt-4">Please enter a valid email address.</p>
        )}
        <form onSubmit={handleSubmit}>

        <input
          type="email"
          name=""
          id=""
          value={email}
          className="py-3 rounded-full  border-base-300 w-11/12 md:3/4 mx-4 my-8 pl-6 shadow-lg"
          onChange={handleChange}
          />
        <button
          type="submit"
          className="rounded-full w-48 bg-base-content p-3 shadow-lg text-base-100 duration-200 hover:scale-105 my-5 -ml-52"
          disabled={!isValid || email === ""}
          >
          Subscribe
        </button>
          </form>

        <p className="banner-sub-text text-white text-xl">
          Subscribe to stay up to date on our latest sales and hottest items
        </p>
      </div>
    </div>
  );
};
