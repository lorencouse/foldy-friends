import React from 'react'
import Link from 'next/link'

export const ProfileIcon = () => {
  return (
    <Link href='/account'>
      <div className="btn btn-ghost btn-circle avatar mx-2">
        <div className="w-10 rounded-full">
          <img alt="profile Photo" src="/Assets/profile-photo.jpg" />
        </div>
      </div>
    </Link>
  )
}
