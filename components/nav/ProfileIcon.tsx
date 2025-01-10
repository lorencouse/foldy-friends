import React from "react";
import Link from "next/link";
import Image from "next/image";

export const ProfileIcon = () => {
  return (
    <Link href="/account">
      <div className="btn btn-ghost btn-circle avatar mx-2">
        <div className="w-10 rounded-full ">
          <Image
            alt="user profile avatar"
            src="/assets/profile-photo.jpg"
            className=""
            width={40}
            height={40}
          />
        </div>
      </div>
    </Link>
  );
};
