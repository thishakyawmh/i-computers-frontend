import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import { getCart } from "../utils/cart";

import UserData from "./userData";

export default function Header() {
    const location = useLocation();
    const [cartCount, setCartCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    useEffect(() => {
        const updateCount = () => {
            const cart = getCart();
            setCartCount(cart.length);
        };
        updateCount();

        window.addEventListener("cartUpdated", updateCount);
        return () => window.removeEventListener("cartUpdated", updateCount);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <>
            <header className="w-full h-[80px] bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 flex items-center">
                <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between px-6">
                    <Link to="/" className="flex items-center gap-3 relative z-[70]">
                        <img src="/logo.png" alt="Logo" className="h-[40px] sm:h-[45px] object-contain" />
                        <div className="flex flex-col">
                            <span className="text-xl sm:text-2xl font-bold text-white font-headings tracking-wider leading-tight">ICM</span>
                            <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium -mt-1 uppercase tracking-widest">
                                {new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening"}
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-2">
                        {["/", "/products", "/about", "/contact"].map((path) => (
                            <Link
                                key={path}
                                to={path}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive(path)
                                    ? "text-white bg-primary-500 shadow-glow"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 sm:gap-5 relative z-[70]">
                        <UserData />
                        <Link to="/cart" className="text-gray-400 hover:text-primary-500 transition-all duration-300 relative group p-2">
                            <FaShoppingCart className="text-lg sm:text-xl" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-primary-500 text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-black group-hover:scale-110 transition-transform">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-white hover:bg-white/10 transition-colors"
                        >
                            {isMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </header>

            <div className={`fixed inset-0 z-40 bg-black md:hidden transition-all duration-500 ${isMenuOpen ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"}`}>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-primary-900/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary-600/5 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10 flex flex-col h-full pt-[120px] px-8 gap-4">
                    {["/", "/products", "/orders", "/about", "/contact"].map((path) => (
                        <Link
                            key={path}
                            to={path}
                            className={`w-full py-4 px-6 rounded-2xl text-xl font-bold font-headings transition-all duration-300 ${isActive(path)
                                ? "text-white bg-primary-600 shadow-glow"
                                : "text-gray-400 hover:text-white hover:bg-white/5 border border-white/5"
                                }`}
                        >
                            {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                        </Link>
                    ))}
                    <UserData isMobileMenu={true} />
                </div>
            </div>
        </>
    );
}