import "./Navbar.css";
import logo from "../../Assets/foldy-friends-logo-192x192.png";
import cart from "../../Assets/cart_icon.png";
import { Link } from 'react-router-dom';
import { useShopContext } from '../../Context/ShopContext';
import { useState, useEffect } from "react";

function NavLink({ url, label, activeCategory, setActiveCategory }: { url: string, label: string, activeCategory: string, setActiveCategory: (active: string) => void }) {
    return (
        <li onClick={() => setActiveCategory(label.toLowerCase())}>
            <Link to={url}>{label}</Link> 
            {activeCategory === label.toLowerCase() && <hr />}
        </li>
    );
}

export function NavLogo() {
    const { setActiveCategory } = useShopContext();

    return (
        <div className="nav-logo flex flex-row items-center" onClick={() => setActiveCategory('shop')}>
            <Link to='/'><img src={logo} alt="Foldy Friends Logo" className='h-16 w-16' /></Link>
            <p className='text-3xl text-gray-700 items-center px-4 select-none'>Foldy Friends</p>
        </div>
    );
};

export function NavBarCart() {

    const { cartCount, setActiveCategory, activeCategory} = useShopContext();

    return (
            <>
                        <Link to="/cart">
                            <img 
                                src={cart} 
                                alt="Cart" 
                                onClick={() => setActiveCategory('cart')} 
                                className="h-5" 
                            />
                        </Link>
                        <div className="cart-count absolute top-0 right-0 rounded-full flex justify-center items-center bg-red-600 text-white h-4 w-4 text-xs ml-3 -mt-1">
                            {cartCount}
                        </div>
                        {activeCategory === "cart" && <hr className="mt-4" />}
    </>

    )

}

export const Navbar = () => {
    const { setActiveCategory, activeCategory } = useShopContext();
    const [showMenu, setShowMenu] = useState<boolean>(true);

    const toggleMenu = () => { setShowMenu(!showMenu); }

    const links = [
        { title: "Home", url: "/" },
        { title: "Shop", url: "/shop" },
        { title: "Men", url: "/men" },
        { title: "Women", url: "/women" },
        { title: "Kids", url: "/kids" },
    ];

        useEffect(() => {
        const handleResize = () => {
            if (window.matchMedia("(min-width: 1024px)").matches) {
                setShowMenu(true);
            } else {
                setShowMenu(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="navbar flex flex-col lg:flex-row justify-between p-4 shadow-md">
            <div className="flex justify-between items-center w-full lg:w-auto">
                <NavLogo />
                <div className="flex items-center gap-5 lg:hidden">
                    <div className="cart-icon relative">
                        <NavBarCart />
                    </div>
                    <div className="hamburger h-8 w-8 outline outline-2 rounded-md flex flex-col justify-around items-center p-2 bg-white hover:bg-gray-100 outline-gray-300 text-gray-500" onClick={toggleMenu}>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                </div>
            </div>

            {showMenu && (
                <div className="menu flex flex-col lg:flex-row lg:grow items-center justify-between mt-4 lg:mt-0">
                    <ul className='nav-menu flex flex-col lg:flex-row items-center mx-12 gap-4 lg:gap-16'>
                        {links.map(link => (
                            <NavLink 
                                key={link.title} 
                                url={link.url} 
                                label={link.title} 
                                activeCategory={activeCategory} 
                                setActiveCategory={setActiveCategory} 
                            />
                        ))}
                    </ul>
                    <Link to="/login">
                        <button 
                            onClick={() => setActiveCategory('login')} 
                            className={`border-2 w-28 lg:my-0 my-8 mx-8 h-10 rounded-md cursor-pointer bg-white hover:bg-gray-100 ${activeCategory === "login" ? "border-red-500 text-red-500 " : "border-gray-300 text-gray-500"}`}>
                            Login
                        </button>
                    </Link>
                </div>
            )}

            <div className="nav-cart hidden lg:flex items-center gap-5 ml-auto">
                <div className="cart-icon relative">
                    <NavBarCart />
                </div>
            </div>
        </div>
    );
}

