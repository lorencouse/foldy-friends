import React, { useState } from 'react';
import Link from 'next/link';
import { LinkInfo } from '../types';
import { NavLogo } from './Navbar/NavLogo';
import SocialIcons from './SocialIcons';

function FooterLink({ navLink, active, setActive }: { navLink: LinkInfo, active: string, setActive: (active: string) => void }) {
    return (
        <li onClick={() => { setActive(navLink.title) }}>
            <Link href={navLink.url}>{navLink.title}</Link> {active === navLink.title ? <hr /> : <></>}
        </li>
    );
}

export const Footer = () => {
    const [active, setActive] = useState("Shop");

    const links: LinkInfo[] = [
        { title: "Shop", url: "/" },
        { title: "Returns", url: "/returns" },
        { title: "About", url: "/about" },
        { title: "Contact", url: "/contact" },
        { title: "Create Product", url: '/create-product' }
    ];

    return (
        <div className='footer w-full p-1'>
            <div className="footer-components flex flex-row flex-wrap m-5 justify-around">
                <NavLogo />
                <ul className='nav-menu flex flex-row flex-wrap  gap-10 m-auto p-5'>
                    { links.map(link => <FooterLink key={link.title} navLink={link} active={active} setActive={setActive} />) }
                </ul>
                <SocialIcons />
            </div>
            <hr className='h-0 outline outline-1 outline-gray-400  m-auto' />
            <div className="copyright my-12">
                <p>Foldy Friends Inc. 2024 - All Rights Reserved</p>
            </div>
        </div>
    );
};