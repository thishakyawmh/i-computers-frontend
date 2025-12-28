import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getCart } from "../utils/cart";

export default function Header() {
    const location = useLocation();
    const [cartCount, setCartCount] = useState(0);

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

    return (
        <header className="w-full h-[80px] bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 flex items-center">
            <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between px-6">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="h-[45px] object-contain" />
                    <span className="text-2xl font-bold text-white font-headings tracking-wider">ICM</span>
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

                <div className="flex items-center gap-5">
                    <Link to="/cart" className="text-gray-400 hover:text-primary-500 transition-all duration-300 relative group p-2">
                        <FaShoppingCart size={22} />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black group-hover:scale-110 transition-transform">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/login" className="hidden sm:block bg-gray-900 border border-white/10 hover:border-primary-500 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-glow hover:text-primary-400">
                        Sign In
                    </Link>
                </div>
            </div>
        </header>
    );
}