import React from "react";
import Checkout from "./Checkout";
import { UserData } from "@/types";
import { getUserProfile } from "@/lib/actions";

const CheckoutPage = async () => {
  const user: UserData | null = await getUserProfile();
  return <Checkout user={user} />;
};

export default CheckoutPage;
