import React from 'react'
import Link from 'next/link';

export function NavLink({ url, label, activeCategory, setActiveCategory }: { url: string, label: string, activeCategory: string, setActiveCategory: (active: string) => void }) {
  return (
    <div className="flex flex-col items-center text-base-content">
      <li className='active:bg-transparent' onClick={() => setActiveCategory(label.toLowerCase())}>
        <Link href={url}>{label}</Link>
      </li>
      {activeCategory === label.toLowerCase() && <hr />}

    </div>

  );
}
