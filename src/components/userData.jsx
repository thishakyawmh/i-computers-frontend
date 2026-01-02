import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiLogOut, BiPackage } from 'react-icons/bi';
import { jwtDecode } from 'jwt-decode';
import UserAvatar from './userAvatar';

export default function UserData({ isMobileMenu = false }) {
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
                setIsLoaded(true);
            } catch (error) {
                console.error("Token decoding failed", error);
            }

            axios.get(import.meta.env.VITE_BACKEND_URL + "/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    setUser(res.data);
                    setIsLoaded(true);
                })
                .catch((err) => {
                    console.error("Failed to fetch user data", err);
                    setIsLoaded(true);
                });
        } else {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    if (!isLoaded) {
        return <div className={`w-24 h-10 bg-white/5 rounded-full animate-pulse ${isMobileMenu ? "w-full" : "hidden sm:block"}`}></div>;
    }

    if (user) {
        if (isMobileMenu) {
            return (
                <div className="flex flex-col gap-4 w-full mt-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-4">
                        <UserAvatar user={user} className="w-12 h-12" />
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-white text-lg font-bold truncate">{user.firstName} {user.lastName}</span>
                            <span className="text-gray-500 text-xs truncate">{user.email}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <Link
                            to="/orders"
                            className="flex items-center gap-3 w-full px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium"
                        >
                            <BiPackage className="text-xl" />
                            My Orders
                        </Link>
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-base text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all font-medium"
                        >
                            <BiLogOut className="text-xl" />
                            Logout
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="relative hidden sm:block" ref={dropdownRef}>
                <div
                    className="flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-white/5 transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <UserAvatar user={user} className="w-8 h-8" />
                    <span className="text-white text-sm font-medium">{user.firstName}</span>
                </div>

                {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-3 w-60 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                            <p className="text-white font-bold text-base truncate">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                        </div>
                        <div className="p-2 space-y-1">
                            <Link
                                to="/orders"
                                onClick={() => setIsDropdownOpen(false)}
                                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all group"
                            >
                                <BiPackage className="text-lg text-gray-500 group-hover:text-primary-400 transition-colors" />
                                My Orders
                            </Link>
                            <button
                                onClick={logout}
                                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all group"
                            >
                                <BiLogOut className="text-lg group-hover:scale-110 transition-transform" />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (isMobileMenu) {
        return (
            <Link
                to="/login"
                className="w-full mt-4 py-4 rounded-xl bg-primary-600 text-white font-bold text-center uppercase tracking-widest shadow-lg hover:bg-primary-500 transition-all"
            >
                My Account
            </Link>
        );
    }

    return (
        <Link to="/login" className="hidden sm:block bg-gray-900 border border-white/10 hover:border-primary-500 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-glow hover:text-primary-400">
            My Account
        </Link>
    );
}
