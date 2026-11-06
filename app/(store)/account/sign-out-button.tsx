"use client";

import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  return (
    <button
      type="button"
      className="btn"
      onClick={async () => {
        await authClient.signOut();
        window.location.assign("/");
      }}
    >
      Sign out
    </button>
  );
}
