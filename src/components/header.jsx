import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full h-[100px] bg-secondary flex items-center justify-start px-6 shadow-md ">
            <img src="/logo.png" alt="Logo" className="h-[80px]" />
            <div className="w-full h-full flex text-text justify-center items-center gap-[20px] text-xl">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </header>
    );
}