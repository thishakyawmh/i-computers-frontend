import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function register() {
        if (!firstName || !lastName || !email || !password) {
            return toast.error("Please fill in all fields");
        }

        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/users", {
                firstName,
                lastName,
                email,
                password
            });
            toast.success("Account created successfully!");
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Registration failed");
        }
    }

    return (
        <div className="w-full min-h-screen bg-black flex items-center justify-center relative overflow-hidden py-12 px-6">
            <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-900/20 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-600/10 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-[1200px] flex flex-col md:flex-row-reverse items-center justify-center gap-12 lg:gap-20 z-10">

                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                        <img src="/logo.png" alt="logo" className="w-[50px] sm:w-[60px] h-auto object-contain" />
                        <span className="text-3xl sm:text-4xl font-bold text-white font-headings tracking-wider">ICM</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold font-headings leading-tight mb-4 sm:mb-6">
                        Join the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Revolution</span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-400 font-light max-w-md hidden sm:block">
                        Create your account to start your journey into the world of high-performance computing.
                    </p>
                </div>

                <div className="w-full md:w-1/2 max-w-[500px]">
                    <div className="bg-surface border border-white/10 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl relative">
                        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

                        <h2 className="text-2xl sm:text-3xl font-bold font-headings text-white mb-2">Create Account</h2>
                        <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">Start your premium tech experience today.</p>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] sm:text-xs font-medium text-gray-400 mb-1.5 block uppercase tracking-widest">First Name</label>
                                    <input
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text"
                                        placeholder="John"
                                        className="w-full h-12 rounded-xl bg-black/40 border border-white/10 text-white px-4 outline-none focus:border-primary-500 transition-all placeholder:text-gray-700 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] sm:text-xs font-medium text-gray-400 mb-1.5 block uppercase tracking-widest">Last Name</label>
                                    <input
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full h-12 rounded-xl bg-black/40 border border-white/10 text-white px-4 outline-none focus:border-primary-500 transition-all placeholder:text-gray-700 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] sm:text-xs font-medium text-gray-400 mb-1.5 block uppercase tracking-widest">Email Address</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full h-12 rounded-xl bg-black/40 border border-white/10 text-white px-4 outline-none focus:border-primary-500 transition-all placeholder:text-gray-700 text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] sm:text-xs font-medium text-gray-400 mb-1.5 block uppercase tracking-widest">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full h-12 rounded-xl bg-black/40 border border-white/10 text-white px-4 outline-none focus:border-primary-500 transition-all placeholder:text-gray-700 text-sm"
                                />
                            </div>
                        </div>

                        <button
                            onClick={register}
                            className="w-full h-12 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold shadow-lg mt-8 transition-all duration-300 uppercase tracking-widest text-xs"
                        >
                            Sign Up Now
                        </button>

                        <div className="mt-8 text-center border-t border-white/5 pt-6">
                            <p className="text-gray-500 text-xs sm:text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="text-white hover:text-primary-400 font-bold transition-colors underline underline-offset-4">
                                    Login Here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}