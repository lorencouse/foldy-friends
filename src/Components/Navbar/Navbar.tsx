import React, { useState } from 'react'
import "./Navbar.css"
import logo from "../../Assets/logo.png"
import cart from "../../Assets/cart_icon.png"
import { Link } from 'react-router-dom'
import { LinkInfo } from '../../types'



function NavLink({ navLink, active, setActive }: { navLink: LinkInfo, active: string, setActive: (active: string) => void }) {
    return (
        <li onClick={() => { setActive(navLink.title) }}>
            <Link to={navLink.url}>{navLink.title}</Link> {active === navLink.title ? <hr /> : <></>}
        </li>
    )
}

export function NavLogo() {
    return (
            <div className="nav-logo flex flex-row items-center">
                <img src={logo} alt="Foldy Friends Logo" />
                <p className='text-3xl text-gray-700 items-center px-4'>Foldy Friends</p>
            </div>
    )
}

export const Navbar = () => {
    const [active, setActive] = useState("Shop");

    const links: LinkInfo[] = [
        { title: "Shop", url: "/" },
        { title: "Men", url: "/men" },
        { title: "Women", url: "/women" },
        { title: "Kids", url: "/kids" },
    ]

    const cartItems = 0;

    return (
        <div className="navbar flex justify-between p-4 shadow-md">
            {/* <div className="nav-logo flex flex-row gap-5 items-center">
                <img src={logo} alt="Foldy Friends Logo" />
                <p className='text-3xl text-gray-700 items-center'>Foldy Friends</p>
            </div> */}

            <NavLogo />
            <ul className='nav-menu flex items-center gap-16'>
                {links.map(link => <NavLink key={link.title} navLink={link} active={active} setActive={setActive} />)}
            </ul>
            <div className="nav-login-cart flex flex-row items-center gap-5">
                <Link to="/login"> <button className='border-gray-300 border-2 w-28 h-10 rounded-md text-gray-500 cursor-pointer bg-white active:bg-gray-300'>Login</button></Link>
                <Link to="/cart"> <img src={cart} alt="Cart" className='h-5' /> </Link>
                <div className="cart-count rounded-full flex justify-center items-center bg-red-600 text-white h-4 w-4 text-xs -ml-6 -mt-5">{cartItems}</div>
            </div>
        </div>
    )
}
