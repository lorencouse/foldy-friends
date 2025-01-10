import React from "react";
import Account from "./Account";
import { getUserProfile } from "@/lib/actions";
import { UserData } from "@/types";
import { redirect } from "next/navigation";

const AccountPage = async () => {
  const user: UserData | null = await getUserProfile();

  if (!user) {
    redirect("/login");
  }

  return <Account user={user} />;
};

export default AccountPage;
