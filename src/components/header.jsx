import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full h-[100px] bg-white flex items-center justify-start px-6 shadow-md">
            <img src="/logo.png" alt="Logo" className="h-[64px]" />
            <div className="w-full h-full flex text-gray-700 justify-center items-center gap-6 text-lg">
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
                <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
                <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>
        </header>
    );
}