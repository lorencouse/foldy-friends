import React from 'react'
import Link from 'next/link';

export function NavLink({ url, label, activeCategory, setActiveCategory }: { url: string, label: string, activeCategory: string, setActiveCategory: (active: string) => void }) {
  return (
    <li onClick={() => setActiveCategory(label.toLowerCase())}>
      <Link href={url}>{label}</Link>
      {activeCategory === label.toLowerCase() && <hr />}
    </li>
  );
}
