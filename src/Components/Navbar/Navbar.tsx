import "./Navbar.css";
import logo from "../../Assets/foldy-friends-logo-192x192.png";
import cart from "../../Assets/cart_icon.png";
import { Link } from 'react-router-dom';
import { LinkInfo } from '../../types';
import { useShopContext } from '../../Context/ShopContext';

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
            <Link to='/'><img src={logo} alt="Foldy Friends Logo" className='h-16' /></Link>
            <p className='text-3xl text-gray-700 items-center px-4 select-none'>Foldy Friends</p>
        </div>
    );
}

export const Navbar = () => {
    const { cartCount, setActiveCategory, activeCategory } = useShopContext();

    const links: LinkInfo[] = [
        { title: "Shop", url: "/" },
        { title: "Men", url: "/men" },
        { title: "Women", url: "/women" },
        { title: "Kids", url: "/kids" },
    ];

    return (
        <div className="navbar flex justify-between p-4 shadow-md">
            <NavLogo />
            <ul className='nav-menu flex items-center gap-16'>
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
            <div className="nav-login-cart flex flex-row items-center gap-5">
                <Link to="/login">
                    <button 
                        onClick={() => setActiveCategory('login')} 
                        className={` border-2 w-28 h-10 rounded-md  cursor-pointer bg-white hover:bg-gray-100 ${activeCategory === "login" ? "border-red-500 text-red-500 " : "border-gray-300 text-gray-500"}`}>
                        Login
                    </button>
                </Link>

                    <div className="cart-icon">

                    <Link to="/cart">
                    <img 
                        src={cart} 
                        alt="Cart" 
                        onClick={() => setActiveCategory('cart')} 
                        className="h-5" 
                    />
                    
                    </Link>
                    <div className="cart-count rounded-full flex justify-center items-center bg-red-600 text-white h-4 w-4 text-xs ml-3 -mt-7">
                        {cartCount}
                    </div>
                    {activeCategory === "cart" && <hr className="mt-4" />}
                            
                    </div>


            </div>
        </div>
    );
}
