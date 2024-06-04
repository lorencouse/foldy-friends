import React from 'react'
import Link from 'next/link';
import { useShopContext } from '../../Context/ShopContext';

export function NavLogo() {
  const { setActiveCategory } = useShopContext();

  return (
    <div className="nav-logo flex flex-row items-center" onClick={() => setActiveCategory('shop')}>
      <Link href='/' legacyBehavior>
        <img src='/Assets/foldy-friends-logo-192x192.png' alt="Foldy Friends Logo" className='h-16 w-16' />
      </Link>
      <p className='text-3xl text-gray-700 items-center px-4 select-none'>Foldy Friends</p>
    </div>
  );
}