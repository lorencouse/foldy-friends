import React from "react";
import Link from "next/link";
import Image from "next/image";

export const ProfileIcon = () => {
  return (
    <Link href="/account">
      <div className="btn btn-ghost btn-circle avatar mx-2 rounded-full overflow-hidden">
        <div className="w-10  ">
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
